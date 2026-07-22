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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor central escuchando en el puerto ${PORT}`);
});