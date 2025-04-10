const express = require('express');
const router = express.Router();
const { getMusicData, deleteMusicData } = require('../controllers/mediaController');

router.get('/music', getMusicData);
router.delete('/music', deleteMusicData);

module.exports = router;
