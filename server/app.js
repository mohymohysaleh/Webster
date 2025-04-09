const express = require('express');
const connectDB = require('./config/mongo');
const musicRoutes = require('./routes/mediaRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api', musicRoutes);

module.exports = app; 