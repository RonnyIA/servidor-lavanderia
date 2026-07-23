const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// ⚠️ CAMBIA ESTA CONSTANTE POR LA URL EXACTA DONDE ABRE TU APP EN AI STUDIO
// (La URL que ves en la barra de direcciones cuando la app está corriendo en el navegador)
const FRONTEND_URL = 'https://lavander-a-pro-5-7.ai.studio'; 

// 1. Ruta puente para los enlaces /ir/:token
app.get('/ir/:token', (req, res) => {
  const token = (req.params.token || '').trim();
  if (!token) {
    return res.redirect(FRONTEND_URL);
  }
  // Redirige pasando las variables de entorno
  return res.redirect(`${FRONTEND_URL}/?remoto=true&token=${encodeURIComponent(token)}`);
});

app.get('/', (req, res) => {
  res.redirect(FRONTEND_URL);
});

app.get('/health', (req, res) => {
  res.status(200).send('OK - Servidor Puente Activo');
});

// 2. Puente de WebSockets por salas
io.on('connection', (socket) => {
  console.log(`[Socket Connected]: ${socket.id}`);

  socket.on('register_branch', ({ token }) => {
    if (token) {
      const roomName = `room_${token}`;
      socket.join(roomName);
      socket.token = token;
      console.log(`Socket ${socket.id} unido a la sala: ${roomName}`);
      io.to(roomName).emit('branch_status', { connected: true, token });
    }
  });

  socket.on('ping_branch', ({ token }) => {
    if (token) {
      const roomName = `room_${token}`;
      const room = io.sockets.adapter.rooms.get(roomName);
      const isBranchOnline = room ? room.size > 0 : false;
      socket.emit('branch_status', { connected: isBranchOnline, token });
    }
  });

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor puente ejecutándose en el puerto ${PORT}`);
});
