const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Objeto para guardar en memoria las URLs de los túneles por Token
const activeTunnels = {};

// Mensaje de prueba al entrar a la raíz del dominio
app.get('/', (req, res) => {
  res.send('Servidor central de Lavandería activo 🚀');
});

// Endpoint 1: Registrar o actualizar el túnel de una PC
app.post('/api/register-tunnel', (req, res) => {
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

// Endpoint 2: Obtener la URL del túnel para el monitor remoto
app.get('/api/get-tunnel/:token', (req, res) => {
  const tokenData = activeTunnels[req.params.token];

  if (!tokenData) {
    return res.status(404).json({ error: 'PC fuera de línea o token no encontrado' });
  }

  res.json(tokenData);
});

// Después de este tiempo sin recibir un nuevo registro, consideramos que la PC está apagada/offline
const STALE_MS = 5 * 60 * 1000; // 5 minutos

function getFreshTunnel(token) {
  const tokenData = activeTunnels[token];
  if (!tokenData) return null;
  const age = Date.now() - new Date(tokenData.updatedAt).getTime();
  if (age > STALE_MS) return null;
  return tokenData;
}

// Endpoint 3: Enlace fijo y compartible. Redirige al navegador hacia la URL real
// del túnel de esa sucursal en este momento. Este es el link que se comparte
// (https://lavanderia.lat/remote/TU_TOKEN) y nunca cambia, aunque la URL del
// túnel cambie cada vez que se reinicia la PC.
app.get('/remote/:token', (req, res) => {
  const tokenData = getFreshTunnel(req.params.token);

  if (!tokenData) {
    return res
      .status(404)
      .send('La PC de la lavandería está desconectada o el enlace no es válido. Verifica que el programa "Lavandería Pro" esté abierto en la sucursal.');
  }

  const cleanUrl = tokenData.url.replace(/\/+$/, '');
  return res.redirect(`${cleanUrl}/?remoto=true&token=${encodeURIComponent(req.params.token)}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor central escuchando en el puerto ${PORT}`);
});