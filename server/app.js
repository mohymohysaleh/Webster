const express = require('express');
const connectDB = require('./config/mongo');
const musicRoutes = require('./routes/mediaRoutes');
const cors = require('cors');
// const testRoutes = require('./routes/testRoutes');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', musicRoutes);
// app.use('/api', testRoutes);

module.exports = app;
