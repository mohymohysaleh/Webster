const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');

// Get all genres with their songs
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().populate('songs');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Get a single genre by ID
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id).populate('songs');
    if (!genre) return res.status(404).json({ error: 'Genre not found' });
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genre' });
  }
});

module.exports = router; 