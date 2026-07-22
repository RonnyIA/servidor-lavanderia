const express = require('express');
const cors = require('cors');
const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());

// Objeto para guardar en memoria las URLs de los túneles por Token.
// NOTA: al vivir en memoria, si Render reinicia o "duerme" esta app (plan
// gratuito), esta lista se vacía. No es un problema real: cada PC vuelve a
// registrarse solita cada pocos minutos mientras el programa esté abierto,
// así que se rellena sola en cuanto vuelve a haber tráfico.
const activeTunnels = {};

// Si defines esta variable de entorno en Render, el registro de túneles
// requiere ese secreto en el header "x-bridge-key" — evita que alguien que
// no sea la app de escritorio pueda registrar URLs falsas. Es opcional:
// si no la defines, el registro queda abierto (funciona igual, solo un
// poco menos protegido contra abuso).
const BRIDGE_SECRET = process.env.BRIDGE_SECRET || null;

// Mensaje de prueba al entrar a la raíz del dominio
app.get('/', (req, res) => {
  res.send('Servidor central de Lavandería activo 🚀');
});

// Endpoint 1: Registrar o actualizar el túnel de una PC
app.post('/api/register-tunnel', (req, res) => {
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

// Endpoint 2: Obtener la URL del túnel para el monitor remoto (uso programático)
app.get('/api/get-tunnel/:token', (req, res) => {
  const tokenData = activeTunnels[req.params.token];

  if (!tokenData) {
    return res.status(404).json({ error: 'PC fuera de línea o token no encontrado' });
  }

  res.json(tokenData);
});

// Endpoint 3: Enlace fijo para las personas — esto es lo que se comparte,
// por ejemplo https://lavanderia.lat/ir/lav-uhl4dz85 — siempre lleva al
// enlace más reciente de esa PC, sin importar que el de Cloudflare cambie
// por detrás cada vez que se reinicia el programa.
app.get('/ir/:token', (req, res) => {
  const tokenData = activeTunnels[req.params.token];

  if (!tokenData) {
    return res.status(404).send(`
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
    `);
  }

  const targetUrl = `${tokenData.url}/?remoto=true&token=${encodeURIComponent(req.params.token)}`;
  res.redirect(302, targetUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor central escuchando en el puerto ${PORT}`);
});
