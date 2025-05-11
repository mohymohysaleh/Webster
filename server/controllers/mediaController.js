const Music = require('../models/song');
const fetchMusicData = require('../utils/apiFetcher');

exports.getMusicData = async (req, res) => {
  try {
    const musicData = await fetchMusicData();
    // Save data to MongoDB
    await Music.insertMany(musicData);
    res.json(musicData);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
