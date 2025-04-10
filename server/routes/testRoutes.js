const express = require('express');
const router = express.Router();
// const { insertTestData } = require('../controllers/testController');
const { GetData } = require('../controllers/mediaController');


// Define a route to insert test data
// router.post('/insert-test-data', insertTestData);
router.post('/get-data', GetData);

module.exports = router;
