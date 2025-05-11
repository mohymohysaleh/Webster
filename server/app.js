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

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://webster-tau.vercel.app' // Vercel frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await connectDB();
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
}

startServer();

module.exports = app;
