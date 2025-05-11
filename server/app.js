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
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api', musicRoutes);
// app.use('/api', testRoutes);
app.use('/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/genres', genreRoutes);

const PORT = 8000;

async function startServer() {
  try {
    await connectDB();
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
}

startServer();

module.exports = app;
