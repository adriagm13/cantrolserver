const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String },
  Userposition: {
    latitude: { type: Number },
    longitude: { type: Number }
},
  PetdistanceAllowed: { type: Number }, //EN METROS
  image: {
    type: String // path to the image file
  },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  createdAt: { type: Date, default: Date.now },
});

// User functions
userSchema.methods.comparePassword = async function (pass) {
  try {
    const isMatch = await bcrypt.compare(pass, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

//guille: 6410d336e7ec594e04f32a4d
//sara: 6410d6f3f15c123cd58259bb
// Create user model
const User = mongoose.model('User', userSchema);


module.exports = User;
