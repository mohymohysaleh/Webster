const Song = require('../models/song');

// Fetch all songs from MongoDB
const getAllMusic = async (req, res) => {
  try {
    const allSongs = await Song.find();
    res.json(allSongs);
  } catch (error) {
    console.error('Error getting all music:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getAllMusic
};
