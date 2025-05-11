// config/socket.js
const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('room:join', (streamId) => {
      socket.join(streamId);
      console.log(`User ${socket.id} joined ${streamId}`);

      const users = io.sockets.adapter.rooms.get(streamId);

      if (users && users.size > 1) {
        const streamerId = [...users][0];

        io.to(streamerId).emit('room:listener-joined', socket.id);
        io.to(socket.id).emit('room:streamer-connected', streamerId);
      }
    });

    socket.on('peer:signal', (targetId, data) => {
      socket.to(targetId).emit('peer:signal', socket.id, data);
      console.log(`Signal from ${socket.id} to ${targetId}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected ${socket.id}`);
    });
  });

  return io;
};
