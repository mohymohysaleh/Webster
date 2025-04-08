const axios = require('axios');

const fetchMusicData = async () => {
  const response = await axios.get('YOUR_MUSIC_API_URL');
  return response.data;
};

module.exports = fetchMusicData;
