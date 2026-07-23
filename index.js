const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Configuración de Socket.IO con CORS para permitir conexiones desde cualquier origen
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (React / Vite)
// Asegúrate de incluir la carpeta de compilación (habitualmente 'dist' o 'public')
app.use(express.static(path.join(__dirname, 'dist')));

// 1. Ruta puente para los enlaces /ir/:token
app.get('/ir/:token', (req, res) => {
  const token = (req.params.token || '').trim();
  if (!token) {
    return res.redirect('/');
  }
  // Redirige a la raíz cargando los parámetros necesarios
  return res.redirect(`/?remoto=true&token=${encodeURIComponent(token)}`);
});

// Ruta de comprobación de salud del servidor en Render
app.get('/health', (req, res) => {
  res.status(200).send('OK - Servidor Puente Activo');
});

// 2. Lógica de WebSockets (Socket.IO) por salas (Rooms)
io.on('connection', (socket) => {
  console.log(`[Socket Connected]: ${socket.id}`);

  // Registro de la sucursal o del monitor usando el token
  socket.on('register_branch', ({ token }) => {
    if (token) {
      const roomName = `room_${token}`;
      socket.join(roomName);
      socket.token = token;
      console.log(`Socket ${socket.id} unido a la sala: ${roomName}`);
      
      // Notifica a la sala que la sucursal está lista/conectada
      io.to(roomName).emit('branch_status', { connected: true, token });
    }
  });

  // Verificación de estado desde el Monitor Remoto
  socket.on('ping_branch', ({ token }) => {
    if (token) {
      const roomName = `room_${token}`;
      const room = io.sockets.adapter.rooms.get(roomName);
      // Si hay más de 1 cliente en la sala, significa que la sucursal está online
      const isBranchOnline = room ? room.size > 0 : false;
      socket.emit('branch_status', { connected: isBranchOnline, token });
    }
  });

  // Sincronización de eventos entre sucursal y monitor remoto
  socket.on('branch_state_update', (data) => {
    if (data && data.token) {
      socket.to(`room_${data.token}`).emit('branch_state_update', data);
    }
  });

  socket.on('remote_state_updated', (data) => {
    if (data && data.token) {
      socket.to(`room_${data.token}`).emit('remote_state_updated', data);
    }
  });

  socket.on('disconnect', () => {
    if (socket.token) {
      const roomName = `room_${socket.token}`;
      io.to(roomName).emit('branch_status', { connected: false, token: socket.token });
    }
    console.log(`[Socket Disconnected]: ${socket.id}`);
  });
});

// 3. Captura cualquier otra ruta GET y sirve el index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Puerto asignado por Render dinámicamente
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor puente ejecutándose en el puerto ${PORT}`);
});
