const mongoose = require('mongoose');

// Define pet schema
const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collar: { type: mongoose.Schema.Types.ObjectId, ref: 'DataCollar' },
  createdAt: { type: Date, default: Date.now },
});

// Create pet model
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
