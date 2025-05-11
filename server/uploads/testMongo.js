const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');

// // Load environment variables from .env file
// dotenv.config({ path: path.join(__dirname, '../.env') });

// MongoDB connection URI
const Mongo_Uri = 'mongodb+srv://kareem:123@webster.wmzywee.mongodb.net/?retryWrites=true&w=majority&appName=webster';

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
    await mongoose.connect(Mongo_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Find all documents in the Music collection
    const musicDocs = await Music.find();
    console.log('Music Documents:', musicDocs);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

// Run the test function
testMongoConnection();
