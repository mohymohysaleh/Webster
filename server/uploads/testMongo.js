const mongoose = require('mongoose');
require('dotenv').config();
// const path = require('path');

// // Load environment variables from .env file
// dotenv.config({ path: path.join(__dirname, '../.env') });

// Use environment variable for MongoDB URI
const Mongo_Uri = process.env.MONGODB_URI;

if (!Mongo_Uri) {
  console.error('MongoDB URI is not defined in environment variables');
  process.exit(1);
}

// Mongoose model for Music
const musicSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String,
  duration: String,
  audio: String,
  image: String
});

const Music = mongoose.model('Music', musicSchema);

// Function to connect to MongoDB and read documents
const testMongoConnection = async () => {
  try {
    await mongoose.connect(Mongo_Uri);
    console.log('MongoDB connected successfully');

    // Find all documents in the Music collection
    const musicDocs = await Music.find();
    console.log('Music Documents:', musicDocs);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Run the test function
testMongoConnection();
