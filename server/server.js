// const app = require('./app.js');

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`)
// });

const app = require('./app');
const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');
const adminRoutes = require('./routes/admin');
const Song = require('./models/song');
const fetchMusicData = require('./utils/apiFetcher');
const Playlist = require('./models/playlist');
const User = require('./models/user');
const Genre = require('./models/genre');

const PORT = process.env.PORT || 5000;

const GENRES = [
  'Pop', 'Hip-Hop', 'R&B', 'Latin', 'Indie', 'Classical'
];

async function seedSongsFromAPI() {
  const existing = await Song.countDocuments();
  if (existing === 0) {
    try {
      const data = await fetchMusicData();
      // Transform Jamendo API data to match our Song model
      const songs = data.results.map(song => ({
        name: song.name,
        artist: song.artist_name,
        album: song.album_name || 'Unknown Album',
        duration: song.duration,
        image: song.image,
        audio: song.audio
      }));
      await Song.insertMany(songs);
      console.log('Seeded songs from Jamendo API');
    } catch (err) {
      console.error('Error seeding songs from API:', err);
    }
  } else {
    console.log('Songs already exist in the database, skipping seeding.');
  }
}

async function getAdminUser() {
  // Use the first admin user found
  const admin = await User.findOne({ role: 'admin' });
  return admin;
}

async function seedGenres() {
  const allSongs = await Song.find();
  for (const genre of GENRES) {
    let genreDoc = await Genre.findOne({ name: genre });
    if (!genreDoc) {
      const shuffled = allSongs.sort(() => 0.5 - Math.random());
      const songs = shuffled.slice(0, 6);
      const coverImage = songs.length > 0 ? songs[Math.floor(Math.random() * songs.length)].image : '/placeholder.svg';
      genreDoc = await Genre.create({
        name: genre,
        songs: songs.map(s => s._id),
        coverImage
      });
      console.log(`Created genre: ${genre}`);
    }
  }
}

async function startServer() {
  await seedSongsFromAPI();
  await seedGenres();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();

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
