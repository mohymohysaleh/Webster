const mongoose = require('mongoose');

Mongo_Uri = 'mongodb://127.0.0.1:27017/Webster';

const connectDB = async () => {
  try {
    await mongoose.connect(Mongo_Uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();
module.exports = connectDB;
