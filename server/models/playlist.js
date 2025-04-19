const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create a model from the schema and explicitly connect to the "playlists" collection
const Playlist = mongoose.model('Playlist', playlistSchema, 'playlists');

module.exports = Playlist; 