const mongoose = require('mongoose');
require('dotenv').config();

// Use environment variable for MongoDB URI
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('MongoDB URI is not defined in environment variables');
  process.exit(1);
}

console.log('MongoDB URI is configured');
