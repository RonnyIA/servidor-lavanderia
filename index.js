const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.set('trust proxy', true);
app.use(cors());

// Objeto para guardar en memoria las URLs de los túneles por Token.
// NOTA: al vivir en memoria, si Render reinicia o "duerme" esta app (plan
// gratuito), esta lista se vacía. No es un problema real: cada PC vuelve a
// registrarse solita cada pocos minutos mientras el programa esté abierto,
// así que se rellena sola en cuanto vuelve a haber tráfico.
const activeTunnels = {};

// Si defines esta variable de entorno en Render, el registro de túneles
// requiere ese secreto en el header "x-bridge-key" — evita que alguien que
// no sea la app de escritorio pueda registrar URLs falsas. Es opcional.
const BRIDGE_SECRET = process.env.BRIDGE_SECRET || null;
const COOKIE_NAME = 'lav_target';

function parseCookies(header) {
  const out = {};
  (header || '').split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx > -1) {
      out[pair.slice(0, idx).trim()] = decodeURIComponent(pair.slice(idx + 1).trim());
    }
  });
  return out;
}

function offlineHtml() {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="utf-8"><title>Sin conexión</title>
    <style>
      body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;
           display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
      .box{max-width:420px;text-align:center;padding:32px;background:#1e293b;
           border-radius:16px;border:1px solid #334155}
      h1{font-size:20px;margin:0 0 8px}
      p{color:#94a3b8;font-size:14px;line-height:1.5}
    </style></head>
    <body>
      <div class="box">
        <h1>Sin conexión con la sucursal</h1>
        <p>La computadora de la lavandería está apagada, sin internet, o el programa está cerrado.
        Intenta de nuevo en un momento.</p>
      </div>
    </body>
    </html>
  `;
}

// Proxy dinámico: reenvía la petición al túnel de Cloudflare que corresponda
// al token guardado en la cookie, pero SIN que el navegador se entere — la
// barra de direcciones se queda siempre en lavanderia.lat.
const dynamicProxy = createProxyMiddleware({
  changeOrigin: true,
  ws: false,
  router: (req) => {
    const token = req._lavToken;
    return activeTunnels[token] ? activeTunnels[token].url : undefined;
  },
  on: {
    error: (err, req, res) => {
      res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(offlineHtml());
    }
  }
});

// Endpoint 1: Registrar o actualizar el túnel de una PC
app.post('/api/register-tunnel', express.json(), (req, res) => {
  if (BRIDGE_SECRET && req.get('x-bridge-key') !== BRIDGE_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { token, remoteUrl } = req.body;

  if (!token || !remoteUrl) {
    return res.status(400).json({ error: 'Faltan datos requeridos (token o remoteUrl)' });
  }

  activeTunnels[token] = {
    url: remoteUrl,
    updatedAt: new Date()
  };

  console.log(`[TÚNEL REGISTRADO] Token: ${token} -> URL: ${remoteUrl}`);
  res.json({ success: true, message: 'Túnel guardado con éxito' });
});

// Endpoint 2: Obtener la URL del túnel (uso programático / diagnóstico)
app.get('/api/get-tunnel/:token', (req, res) => {
  const tokenData = activeTunnels[req.params.token];
  if (!tokenData) {
    return res.status(404).json({ error: 'PC fuera de línea o token no encontrado' });
  }
  res.json(tokenData);
});

// Endpoint 3: Punto de entrada del enlace fijo — https://lavanderia.lat/ir/<token>
// Marca en una cookie con cuál PC está navegando este visitante, y desde
// aquí en adelante TODO (assets, llamadas a la API) se reenvía a esa PC sin
// cambiar de dirección en el navegador.
app.get('/ir/:token', (req, res, next) => {
  const token = req.params.token;
  if (!activeTunnels[token]) {
    res.clearCookie(COOKIE_NAME);
    return res.status(404).send(offlineHtml());
  }

  res.cookie(COOKIE_NAME, token, {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24, // 1 día
    sameSite: 'lax',
    secure: Boolean(req.secure)
  });

  req._lavToken = token;
  req.url = `/?remoto=true&token=${encodeURIComponent(token)}`;
  return dynamicProxy(req, res, next);
});

// Cualquier otra petición (los archivos de la app, y sus llamadas a la API
// interna) se reenvía a la PC "activa" para este visitante, según la
// cookie que se puso arriba. Si no hay cookie válida, se deja pasar de
// largo (por ejemplo, para que "/" muestre el mensaje de estado normal).
app.use((req, res, next) => {
  if (req.path.startsWith('/api/register-tunnel') || req.path.startsWith('/api/get-tunnel/') || req.path.startsWith('/ir/')) {
    return next();
  }
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[COOKIE_NAME];
  if (!token || !activeTunnels[token]) {
    return next();
  }
  req._lavToken = token;
  return dynamicProxy(req, res, next);
});

// Mensaje de prueba al entrar a la raíz del dominio (solo si no hay cookie activa)
app.get('/', (req, res) => {
  res.send('Servidor central de Lavandería activo 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor central escuchando en el puerto ${PORT}`);
});
