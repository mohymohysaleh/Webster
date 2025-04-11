const Music = require('../models/song');
const fetchMusicData = require('../utils/apiFetcher');

// Fetch data from MongoDB
exports.getMusicDataFromDB = async (req, res) => {
  try {
    const musicDocs = await Music.find();
    res.json(musicDocs);
  } catch (err) {
    console.error('Error fetching music data from DB:', err);
    res.status(500).send('Server Error');
  }
};

// Fetch data from API and insert into MongoDB
exports.getMusicData = async (req, res) => {
  try {
    const apiResponse = await fetchMusicData();
    const transformedData = apiResponse.results.map(item => ({
      name: item.name,
      artist: item.artist_name,
      album: item.album_name,
      duration: item.duration.toString(),
      audio: item.audio,
      image: item.album_image
    }));

    await Music.insertMany(transformedData);

    if (typeof res.json === 'function') {
      res.json(transformedData);
    } else {
      res.json(transformedData);
    }
  } catch (err) {
    console.error('Error saving music data:', err);
    if (typeof res.status === 'function') {
      res.status(500).send('Server Error');
    }
  }
};
