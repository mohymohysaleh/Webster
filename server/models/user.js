const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  google_sub: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  likedSongs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }],
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlist'
  }],
  recentSearches: [{
    type: {
      type: String, // 'song', 'artist', etc.
      default: 'song'
    },
    song: {
      type: Schema.Types.ObjectId,
      ref: 'Song'
    },
    name: String,
    artist: String,
    image: String
  }]
}, {
  timestamps: true
});

// Create indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ google_sub: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
