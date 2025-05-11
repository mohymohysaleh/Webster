const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Log the MongoDB URI to verify it's being read correctly
console.log('MongoDB URI:', process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
