const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
require('dotenv').config();

Mongo_Uri = 'mongodb://127.0.0.1:27017/Webster';

// Specify the path to the .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Log the MongoDB URI to verify it's being read correctly
// console.log('MongoDB URI:', process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(Mongo_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();
module.exports = connectDB;
