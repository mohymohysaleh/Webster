const mongoose = require('mongoose');
const { Schema } = mongoose;

const genreSchema = new Schema({
  name: { type: String, required: true, unique: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  coverImage: { type: String, default: '/placeholder.svg' }
}, { timestamps: true });

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre; 