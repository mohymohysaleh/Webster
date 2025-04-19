const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Song = require('../models/song');
const verifyToken = require('../middleware/verifyToken');


const isAdmin = async (req, res, next) => {
  try {
    console.log('User in middleware:', req.user);
    
    
    if (req.user && req.user.userId && !req.user.role) {
      const user = await User.findById(req.user.userId);
      if (user) {
        req.user = {
          userId: user._id.toString(),
          email: user.email,
          role: user.role
        };
      }
    }
    
    
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: Not authenticated' });
    }
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    
    console.log('Admin access granted for user:', req.user);
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ error: error.message });
  }
};


router.use(verifyToken);

router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/users/:userId/role', isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    
    const user = await User.findByIdAndUpdate(
      userId, 
      { role }, 
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/users/:userId', isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Prevent deleting own account
    if (userId === req.user.userId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }
    
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/songs', isAdmin, async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/songs', isAdmin, async (req, res) => {
  try {
    const { name, artist, album, duration, image, audio } = req.body;
    
    const newSong = new Song({
      name,
      artist,
      album,
      duration,
      image,
      audio
    });
    
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/songs/:songId', isAdmin, async (req, res) => {
  try {
    const { songId } = req.params;
    
    const song = await Song.findByIdAndDelete(songId);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 