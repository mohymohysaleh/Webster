const express = require('express');
const router = express.Router();
const { getMusicData, getAllMusic } = require('../controllers/mediaController');

// GET music data
router.get('/music/db', getMusicData);

// GET all music
router.get('/songs', getAllMusic);

module.exports = router;
