const express = require('express');
const router = express.Router();
const { getMusicData } = require('../controllers/mediaController');

router.get('/music', getMusicData);

module.exports = router;
