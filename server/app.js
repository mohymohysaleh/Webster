const express = require('express');
const connectDB = require('./config/mongo');
const musicRoutes = require('./routes/mediaRoutes');
const app = express();

connectDB();

app.use(express.json());
app.use('/api', musicRoutes);

module.exports = app; 