const Music = require('../models/song');
const fetchMusicData = require('../utils/apiFetcher');

// Function to get music data
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
    res.json(transformedData);
  } catch (err) {
    console.error('Error saving music data:', err);
    res.status(500).send('Server Error');
  }
};

// Function to delete music data
exports.deleteMusicData = async (req, res) => {
  try {
    const { id } = req.query; // Assuming you pass the ID as a query parameter
    if (!id) {
      return res.status(400).send('ID is required');
    }

    const result = await Music.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Music not found');
    }

    res.json({ message: 'Music deleted successfully', data: result });
  } catch (err) {
    console.error('Error deleting music data:', err);
    res.status(500).send('Server Error');
  }
};
