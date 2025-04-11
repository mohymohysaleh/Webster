const express = require('express');
const router = express.Router();
const { getMusicData, getMusicDataFromDB } = require('../controllers/mediaController');

router.get('/music', getMusicData);
router.get('/music/db', getMusicDataFromDB); // New endpoint to fetch data from MongoDB

module.exports = router;
