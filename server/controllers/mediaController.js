const Music = require('../models/song');
const fetchMusicData = require('../utils/apiFetcher');

// Change all references from Music to Song for consistency
const Song = Music;

const musicDB = [
  {
    name: "Simple Exercice",
    artist: "Both",
    album: "Gym Class",
    duration: "5:40",
    audio: "https://prod-1.storage.jamendo.com/?trackid=247&format=mp3i&from=8D7AQ...",
    image: "https://usercontent.jamendo.com?type=album&id=33&width=300&trackid=247"
  },
  {
    name: "En attendant d'aller sur Mars",
    artist: "Both",
    album: "En attendant d'aller sur Mars...",
    duration: "308",
    audio: "https://prod-1.storage.jamendo.com/?trackid=1100&format=mp3i&from=23Qu...",
    image: "https://usercontent.jamendo.com?type=album&id=174&width=300&trackid=11..."
  },
  {
    name: "Axel",
    artist: "Both",
    album: "En attendant d'aller sur Mars...",
    duration: "293",
    audio: "https://prod-1.storage.jamendo.com/?trackid=1101&format=mp3i&from=84%2...",
    image: "https://usercontent.jamendo.com?type=album&id=174&width=300&trackid=11..."
  }
];

// Fetch data from MongoDB
const getMusicDataFromDB = async (req, res) => {
  try {
    const musicDocs = await Song.find();
    res.json(musicDocs);
  } catch (err) {
    console.error('Error fetching music data from DB:', err);
    res.status(500).send('Server Error');
  }
};

// Get all music or insert initial data if none exists
const getMusicData = async (req, res) => {
  try {
    // Check if songs already exist in the database
    const existingSongs = await Song.find();
    if (existingSongs.length > 0) {
      return res.json(existingSongs);
    }

    // Insert initial music data if no songs exist
    console.log('No songs found in database, inserting initial data');
    const createdSongs = await Song.insertMany(musicDB);
    res.json(createdSongs);
  } catch (error) {
    console.error('Error getting music data:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getAllMusic = async (req, res) => {
  try {
    const allSongs = await Song.find();
    console.log(`Found ${allSongs.length} songs in the Music collection`);
    
    // Log first song to check audio URL format
    if (allSongs.length > 0) {
      console.log('Sample song:', {
        name: allSongs[0].name,
        artist: allSongs[0].artist,
        audioUrl: allSongs[0].audio
      });
    }
    
    res.json(allSongs);
  } catch (error) {
    console.error('Error getting all music:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getMusicData,
  getAllMusic,
  getMusicDataFromDB
};
