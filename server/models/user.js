const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  google_sub: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  likedSongs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music'
  }],
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  }]
}, {
  timestamps: true
});

// Create indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ google_sub: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
