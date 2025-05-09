const express = require('express');
const router = express.Router();
const { getAllMusic } = require('../controllers/mediaController');

// GET all music
router.get('/songs', getAllMusic);

module.exports = router;
