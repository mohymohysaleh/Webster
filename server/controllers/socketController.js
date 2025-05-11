// controllers/socketController.js
module.exports = {
    handleJoinRoom: (socket, streamId) => {
      socket.join(streamId);
      console.log(`User ${socket.id} joined ${streamId}`);
  
      const users = socket.adapter.rooms.get(streamId);
  
      if (users && users.size > 1) {
        const streamerId = [...users][0];
  
        socket.to(streamerId).emit('room:listener-joined', socket.id);
        socket.to(socket.id).emit('room:streamer-connected', streamerId);
      }
    },
  
    handleSignal: (socket, targetId, data) => {
      socket.to(targetId).emit('peer:signal', socket.id, data);
      console.log(`Signal from ${socket.id} to ${targetId}`);
    }
  };
  