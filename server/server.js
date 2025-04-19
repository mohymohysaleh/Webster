// const app = require('./app.js');

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`)
// });

const app = require('./app');
const { getMusicData } = require('./controllers/mediaController');
const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');
const adminRoutes = require('./routes/admin');

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  try {
    await getMusicData({}, {
      json: (data) => console.log('Initial Data Inserted:', data),
      status: () => {}
    });
  } catch (error) {
    console.error('Error inserting initial data:', error);
  }
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/admin', adminRoutes);

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
