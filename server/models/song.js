const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  duration: { type: String, required: true },
  audio: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Music', MusicSchema, 'Music');
