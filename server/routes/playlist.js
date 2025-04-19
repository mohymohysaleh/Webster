const express = require('express');
const router = express.Router();
const verifyRefreshToken = require('../middleware/verifyToken');
const Playlist = require('../models/playlist');
const User = require('../models/user');
const Music = require('../models/song');

// Get user's playlists
router.get('/my-playlists', verifyRefreshToken, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id })
      .populate('songs')
      .sort({ createdAt: -1 });
    res.json(playlists);
  } catch (err) {
    console.error('Error fetching playlists:', err);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

// Create new playlist
router.post('/create', verifyRefreshToken, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const playlist = await Playlist.create({
      name,
      description,
      user: req.user.id,
      isPublic
    });

    // Add playlist to user's playlists
    await User.findByIdAndUpdate(req.user.id, {
      $push: { playlists: playlist._id }
    });

    res.status(201).json(playlist);
  } catch (err) {
    console.error('Error creating playlist:', err);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

// Add song to playlist
router.post('/:playlistId/add-song', verifyRefreshToken, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const song = await Music.findById(songId);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (err) {
    console.error('Error adding song to playlist:', err);
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
});

// Remove song from playlist
router.delete('/:playlistId/remove-song/:songId', verifyRefreshToken, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    playlist.songs = playlist.songs.filter(songId => songId.toString() !== req.params.songId);
    await playlist.save();

    res.json(playlist);
  } catch (err) {
    console.error('Error removing song from playlist:', err);
    res.status(500).json({ error: 'Failed to remove song from playlist' });
  }
});

// Like/unlike a song
router.post('/toggle-like/:songId', verifyRefreshToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const songId = req.params.songId;

    const songIndex = user.likedSongs.indexOf(songId);
    if (songIndex === -1) {
      user.likedSongs.push(songId);
    } else {
      user.likedSongs.splice(songIndex, 1);
    }

    await user.save();
    res.json({ likedSongs: user.likedSongs });
  } catch (err) {
    console.error('Error toggling like:', err);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});

// Get user's liked songs
router.get('/liked-songs', verifyRefreshToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('likedSongs');
    res.json(user.likedSongs);
  } catch (err) {
    console.error('Error fetching liked songs:', err);
    res.status(500).json({ error: 'Failed to fetch liked songs' });
  }
});

module.exports = router; 