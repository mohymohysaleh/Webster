const axios = require('axios');

const fetchMusicData = async () => {
  try {
    const response = await axios.get('https://api.jamendo.com/v3.0/tracks/?client_id=1e38fb9b');
    console.log('API Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching music data:', error);
    throw error;
  }
};

module.exports = fetchMusicData;
fetchMusicData();