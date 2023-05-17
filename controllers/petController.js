const DataCollar = require('../models/datacollar.model');
const Pet = require('../models/pet.model');
const User = require('../models/user.model');


const getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).send({ message: 'Pet not found' });
    }
    res.send(pet);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(200).send(pet);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) {
      return res.status(404).send({ message: 'Pet not found' });
    }
    res.send(pet);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).send({ message: 'Pet not found' });
    }
    res.send(pet);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// ******************************************************//
// ******************ADD NEW PET FUNCTION*****************//
//Add pet to user requested

const addPet = async (req, res) => {

  const name = req.body.pet.name;
  const species = req.body.pet.species;
  const breed = req.body.pet.breed;
  const age = req.body.pet.age;
  const owner = req.body.pet.owner;

console.log(" name: " + name + " species: " + species + " breed: " + breed + " age: " + age + " owner: " + owner)

  try {
    const user = await User.findById(owner);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
    const pet = new Pet({
      name: name,
      species: species,
      breed: breed,
      age: age,
      owner: user
    });
    pet.save();
    user.pets.push(pet);
    user.save();
    res.status(201).json({ message: 'Pet created successfully' });
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
};

// ******************************************************//
// ******************REMOVE PET FUNCTION*****************//
//Remove pet to user requested
const removePet = async (req, res) => {

  const name = req.body.pet.name;
  const owner = req.body.pet.owner;

  console.log(" name: " + name + " owner: " + owner)

  try {
    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    } else {

      const pet = await Pet.findOneAndDelete({ name: name, owner: owner });
      if (!pet) {
        return res.status(404).send({ message: 'Pet not found' });
      }

      // remove the pet's ID from the owner's pets array
      user.pets.pull(pet._id);
      await user.save();

      res.status(201).json({ message: 'Pet removed successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ******************************************************//
// ******************GET PET POSITION FUNCTION*****************//
//Remove pet to user requested


const getPetPosition = async (req, res) => {

    const name = req.body.pet.name;
    const owner = req.body.pet.owner;
  
    console.log(" name: " + name + " owner: " + owner)
  
    try {
      const user = await User.findById(owner);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      } else {
  
        const pet = await Pet.findOne({ name: name, owner: owner });
        if (!pet) {
          return res.status(404).send({ message: 'Pet not found' });
        }
  
        const dataCollarThisPet = await DataCollar.findById(pet.collar);

        if(!dataCollarThisPet){
          return res.status(404).send({ message: 'Collar not found' });
        }

        const positionPet = getPositionOfLastData(dataCollarThisPet);

        if(!positionPet){
          return res.status(404).send({ message: 'Not pet position found' });
        }

        const positionRecinto = user.Userposition;
        const distance = calculateDistanceDog(positionPet.latitude, positionPet.longitude, positionRecinto.latitude, positionRecinto.longitude);
  
        res.status(201).json({ message: 'Get position pet successfully', lastknownposition: positionPet, ownerposition: positionRecinto, distance: distance});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  function getPositionOfLastData(dataCollar) {
    const lastData = dataCollar.data[dataCollar.data.length - 1];
    return lastData.position;
  }


  
  function calculateDistanceDog(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371000; // Radio de la Tierra en metros
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Diferencia en latitud en radianes
    const dLon = (lon2 - lon1) * Math.PI / 180;  // Diferencia en longitud en radianes
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distancia en metros
    console.log(distance);

    return Math.floor(distance);
  }
  


module.exports = {
  getPet,
  createPet,
  updatePet,
  deletePet,
  addPet,
  removePet,
  getPetPosition,
  getPositionOfLastData,
  calculateDistanceDog,
};
