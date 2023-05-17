const User = require('../models/user.model');
const Pet = require('../models/pet.model');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// ******************CRUD FUNCTIONS**********************//

const createUser = async (req, res) => {
 
  console.log(req.body)
      // TEMPORALLLLLLLLLLLLLL? hash al registrarse. Los registrados a mano en el server?//
// define the number of salt rounds to use
const saltRounds = 10;

// hash the password before storing it in the database
const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });
    console.log(user);


    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// ******************************************************//
// ******************SIGN UP AUTH FUNCTION*****************//
//Auth with sessions.

const signupUser = async (req, res) => {

  
  const email = req.body.user.email;
  const password = req.body.user.password;
  const name = req.body.user.name;
  const lastname = req.body.user.lastname;
console.log(" email: " + email + " passw: " + password + " name: " + name + " lastname: " + lastname )

  try {
    // Check if user with email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }
// TEMPORALLLLLLLLLLLLLL? hash al registrarse. Los registrados a mano en el server?//
// define the number of salt rounds to use
const saltRounds = 10;

// hash the password before storing it in the database
const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
      lastname: lastname
    });
    console.log(user);


    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
};

// ******************************************************//
// ******************LOGIN AUTH FUNCTION*****************//
//Auth with sessions. Use comparePassword to compare on MongoDB Database

const loginUser = async (req, res) => {

  
  const email = req.body.email;
  const password = req.body.password;
  console.log(" email: " + email + " passw: " + password)
  try {
    // Find the user with the specified email address
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      console.log("ESTE MI LOCO")

      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create a new session for the user
    //req.session.userId = user._id;
    const userFound = await User.findById(user._id);
    let userID = userFound._id;
    let userName = userFound.name;
    let userLastname = userFound.lastname;
    let userEmail = userFound.email;
    let userPets = userFound.pets;
    let petsArray = Array();
    let distanceAllow = userFound.PetdistanceAllowed;
    for(let petID of userPets){
      let pet = await Pet.findById(petID);
      if (!pet) {
        return res.status(404).send({ message: 'Pets not found' });
      }
      petsArray.push(pet);
    };
    console.log(petsArray);
    console.log(userFound.Userposition);
    console.log(userFound.PetdistanceAllowed);
    res.status(200).json({ message: 'Login successful', user: { userID: userID, email: userEmail, name: userName, lastname: userLastname, pets : petsArray, distanceallow: distanceAllow }});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ******************************************************//
// ******************ADD USER POSITION FUNCTION*****************//
//Add user position and distance allowed for pets

const addDistancePosition = async (req, res) => {

  const lat = req.body.recintoConfig.latitude;
  const lon = req.body.recintoConfig.longitude;
  const distance = req.body.recintoConfig.distance;
  const owner = req.body.recintoConfig.owner;

console.log(" user: " + owner + " distance: " + distance + " lon: " + lon + " lat: " + lat);

  try {
    const user = await User.findById(owner);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
    const pos = { latitude: lat, longitude: lon };
    user.Userposition = pos;
    user.PetdistanceAllowed = distance;
    user.save();
    res.status(201).json({ message: 'Distance saved successfully' });
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
};


module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
  addDistancePosition
};
