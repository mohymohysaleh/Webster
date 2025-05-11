// routes/socket.js
const express = require('express');
const router = express.Router();

module.exports = (io) => {
  router.get('/', (req, res) => {
    res.send('WebSocket server is running');
  });

  return router;
};
