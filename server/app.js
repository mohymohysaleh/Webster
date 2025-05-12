const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const musicRoutes = require('./routes/mediaRoutes');
// const testRoutes = require('./routes/testRoutes');
const connectDB = require('./config/mongo');
const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');
const commentRoutes = require('./routes/comments');
const genreRoutes = require('./routes/genre');
const mongoose = require('mongoose');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://webster-tau.vercel.app'], // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', musicRoutes);
// app.use('/api', testRoutes);
app.use('/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/genres', genreRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    // Log health check request
    console.log('Health check requested:', {
      timestamp: new Date().toISOString(),
      dbStatus,
      uptime: process.uptime()
    });

    // Basic server check
    if (dbStatus === 'disconnected') {
      throw new Error('Database not connected');
    }

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      uptime: process.uptime()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await connectDB();
    console.log('Database connected successfully');
    
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });

  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
}

startServer();

module.exports = app;