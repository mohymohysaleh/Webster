const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const musicRoutes = require('./routes/mediaRoutes');
// const testRoutes = require('./routes/testRoutes');
const connectDB = require('./config/mongo');
const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');

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

const PORT = 8000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await connectDB();
    console.log('Database connected');
  } catch (err) {
    console.error('DB connection failed:', err);
  }
});

module.exports = app;
