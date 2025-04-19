const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  audio: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create a model from the schema and explicitly connect to the "Music" collection
const Song = mongoose.model('Song', songSchema, 'Music');

module.exports = Song;
