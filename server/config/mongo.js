require('dotenv').config(); // ✅ Must be first to load .env variables

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // ✅ Support both local and cloud MongoDB URIs
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI or MONGODB_URI must be defined in .env');
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit the app if DB fails
  }
};

module.exports = connectDB;
