const Music = require('../models/song');

// Sample data to insert into MongoDB
const testData = [
  {
    name: 'Test Song 1',
    artist: 'Test Artist 1',
    album: 'Test Album 1',
    duration: '300',
    audio: 'http://example.com/audio1',
    image: 'http://example.com/image1'
  },
  {
    name: 'Test Song 2',
    artist: 'Test Artist 2',
    album: 'Test Album 2',
    duration: '250',
    audio: 'http://example.com/audio2',
    image: 'http://example.com/image2'
  },
  {
    name: 'Test Song 3',
    artist: 'Test Artist 3',
    album: 'Test Album 3',
    duration: '255',
    audio: 'http://example.com/audio3',
    image: 'http://example.com/image3'
  }

];

exports.insertTestData = async (req, res) => {
  try {
    // Insert the test data into MongoDB
    const insertResult = await Music.insertMany(testData);
    console.log('Insert Result:', insertResult);

    res.json({ message: 'Test data inserted successfully', data: insertResult });
  } catch (err) {
    console.error('Error inserting test data:', err);
    res.status(500).send('Server Error');
  }
};
