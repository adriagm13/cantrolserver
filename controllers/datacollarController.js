const DataCollar = require('../models/datacollar.model');
const Pet = require('../models/pet.model');
const User = require('../models/user.model');
const Acceleration = require('../models/acceleration.model');
const AccelerationPrint = require('../models/accelerationprint.model');

const getCollarData = async (req, res) => {
  try {
    const collarData = await DataCollar.findOne({ collar_id: req.params.id });
    if (!collarData) {
      return res.status(404).send({ message: 'Collar data not found' });
    }
    res.send(collarData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createCollarData = async (req, res) => {
  try {
    const collarData = new DataCollar(req.body);
    await collarData.save();
    res.status(200).send(collarData);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updateCollarData = async (req, res) => {
  try {
    const collarData = await DataCollar.findOneAndUpdate(
      { collar_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!collarData) {
      return res.status(404).send({ message: 'Collar data not found' });
    }
    res.send(collarData);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteCollarData = async (req, res) => {
  try {
    const collarData = await DataCollar.findOneAndDelete({ collar_id: req.params.id });
    if (!collarData) {
      return res.status(404).send({ message: 'Collar data not found' });
    }
    res.send(collarData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// ******************************************************//
// ******************ADD NEW COLLAR FUNCTION*****************//
//Add collar to pet requested
const addDataCollar = async (req, res) => {

  const collar_id = req.body.collar.collar_id;
  const name = req.body.collar.petowner.name;
  const owner = req.body.collar.petowner.owner;

  console.log(" collarid: " + collar_id + " namepet: " + name + "ownerUser: " + owner);
  try {
    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const pet = await Pet.findOne({ name: name, owner: owner });
    if (!pet) {
      return res.status(404).send({ message: 'Pet not found' });
    }

    const dataCollar = new DataCollar({
      collar_id: collar_id,
      petowner: pet,
    });

    await dataCollar.save();

    pet.collar = dataCollar;
    await pet.save();

    res.status(201).json({ message: 'Data collar created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ******************************************************//
// ******************REMOVE COLLAR FUNCTION*****************//
//Remove collar
const removeDataCollar = async (req, res) => {
  const { collar_id, name, owner } = req.body;

  try {
    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }


    const pet = await Pet.findOne({ name: name, owner: owner });
    if (!pet) {
      return res.status(404).send({ message: 'Pet not found' });
    }

    pet.collar = null;

    const dataCollar = await DataCollar.findOneAndDelete({ collar_id: collar_id });
    if (!dataCollar) {
      return res.status(404).send({ message: 'Data collar not found' });
    }

    await pet.save();

    res.status(201).json({ message: 'Data collar removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ******************************************************//
// ******************SAVE COLLAR FUNCTION*****************//
//Add new Collar or Add new data to a Collar. If Collar does not
//exists, it is created.
async function saveDataCollar(datos) {
   
    const {
      end_device_ids: { dev_eui },
      received_at,
      uplink_message: {
        decoded_payload: {
          acceleration_x,
          acceleration_y,
          acceleration_z,
          altitude,
          hdop,
          latitude,
          longitude,
          micromean,
          sats
        },
      }} = datos;

    const newData = {
      timestamp: new Date(received_at),
      acceleration_x,
      acceleration_y,
      acceleration_z,
      position: {       
        altitude,
        latitude,
        longitude,
      },
      micro: { micromean },
    };

    console.log('VOY A ACTUALIZAR: ' + JSON.stringify(newData));
    try{
      const collarData = await DataCollar.findOne( {collar_id : dev_eui});
      if(collarData){
        const dataCollar = await DataCollar.findOneAndUpdate(
          { collar_id: dev_eui },
          { $push: { data: newData } },
          { new: true }
        );
        
        console.log('Datos del collar ACTUALIZADOS correctamente.: ' + JSON.stringify(dataCollar));
        console.log('Comprobamos distancia');
          checkPetDistance(dataCollar, newData.position);
      } else{
      console.log(`NO EXISTE AUN`);
        try{
          const newCollarData = await DataCollar.create({
            collar_id: dev_eui,
            data: [newData],
          });
          console.log('Datos del collar guardados correctamente.: ' + newCollarData);
          }catch(error){
          console.error(`Error al guardar los datos del collar: ${error}`);
      
          }
      }
    }catch(error){
      console.error(`Error al ACTUALIZAR los datos del collar: ${error}`);
    }
  };

  async function checkPetDistance(dataCollar, lastPositionPet) {

    try{
      const petID = dataCollar.petowner;
      const pet = await Pet.findById(petID);

      if(pet){
        const user = await User.findById(pet.owner);
        if(user){
          const distanceAllowed = user.PetdistanceAllowed;
          if(distanceAllowed){
            const UserRecintoPosition = user.Userposition;
            const ActualDistance = calculateDistance(UserRecintoPosition.latitude,UserRecintoPosition.longitude,lastPositionPet.latitude,lastPositionPet.longitude);

            if(ActualDistance > distanceAllowed){
              console.log("QUE SE TE ESCAPA EL PERRO");
            }else{
              console.log("Perro dentro del rango");
            }
          }else{
            console.log("no distance saved");
          }
        }
      }else{
        console.log("no pet asociated");
      }

    }catch(error){
      console.log(error)
    }

  }


  function calculateDistance(lat1, lon1, lat2, lon2) {
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
    return distance;
  }
  
  

// ******************************************************//
// ******************DELETE ALL COLLAR FUNCTION*****************//
//CLEAR ALL DATACOLLAR FROM THE DATABASE
  async function deleteAllDataCollars() {
    try {
      const result = await DataCollar.deleteMany({});
      console.log(`${result.deletedCount} DataCollars borrados`);
    } catch (err) {
      console.error(err);
    }
  }
 
  // ******************************************************//
// ******************ACCELERATION PROCESS FUNCTION*****************//
//Calculate acceleration mean and variance, each {samples}
//relationated with a timestamp


async function getAccelerometerData(collar_id, X) {
  const dataCollar = await DataCollar.findOne({ collar_id });
  const { data } = dataCollar;

  const results = [];
  let sum = {
    acceleration_x: 0,
    acceleration_y: 0,
    acceleration_z: 0,
  };
  let squareSum = {
    acceleration_x: 0,
    acceleration_y: 0,
    acceleration_z: 0,
  };

  for (let i = 0; i < data.length; i++) {
    const sample = data[i];
    sum.acceleration_x += sample.acceleration_x;
    sum.acceleration_y += sample.acceleration_y;
    sum.acceleration_z += sample.acceleration_z;
    squareSum.acceleration_x += Math.pow(sample.acceleration_x, 2);
    squareSum.acceleration_y += Math.pow(sample.acceleration_y, 2);
    squareSum.acceleration_z += Math.pow(sample.acceleration_z, 2);

    if ((i + 1) % X === 0) {
      const timestamp = sample.timestamp;
      const N = X;
      const mean = {
        acceleration_x: sum.acceleration_x / N,
        acceleration_y: sum.acceleration_y / N,
        acceleration_z: sum.acceleration_z / N,
      };
      const variance = {
        acceleration_x: squareSum.acceleration_x / N - Math.pow(mean.acceleration_x, 2),
        acceleration_y: squareSum.acceleration_y / N - Math.pow(mean.acceleration_y, 2),
        acceleration_z: squareSum.acceleration_z / N - Math.pow(mean.acceleration_z, 2),
      };
      results.push({ timestamp, mean, variance });

      sum = {
        acceleration_x: 0,
        acceleration_y: 0,
        acceleration_z: 0,
      };
      squareSum = {
        acceleration_x: 0,
        acceleration_y: 0,
        acceleration_z: 0,
      };
    }
  }
  console.log(results);

  return results;
}

// ******************************************************//
// ******************CALCULATE ACCELERATION VARIANCE NORM FUNCTION*****************//
//Calculate Norm of variance of acceleration, gives a 
//timestamp with the norm

function calculateNormOfVariance(accelerationStats) {
  const variance = accelerationStats.variance;
  const norm = Math.sqrt(
    Math.pow(variance.acceleration_x, 2) +
    Math.pow(variance.acceleration_y, 2) +
    Math.pow(variance.acceleration_z, 2)
  );
  console.log("Timestamp:", accelerationStats.timestamp);
  console.log("Norm of variance:", norm);
  return {timestamp: accelerationStats.timestamp, norm: norm};
}

// ******************CALCULATE ACCELERATION MEAN NORM FUNCTION*****************//
//Calculate Norm of mean of acceleration, gives a 
//timestamp with the norm

function calculateNormOfMean(accelerationStats) {
  const mean = accelerationStats.mean;
  const norm = Math.sqrt(
    Math.pow(mean.acceleration_x, 2) +
    Math.pow(mean.acceleration_y, 2) +
    Math.pow(mean.acceleration_z, 2)
  );
  console.log("Timestamp:", accelerationStats.timestamp);
  console.log("Norm of mean:", norm);
  return {timestamp: accelerationStats.timestamp, norm: norm};
}

async function calculateNorms(collar_id) {

  const samples = 3;
  const accelerationData = await getAccelerometerData(collar_id, samples);

  const result = {
    varianceNorms: [],
    meanNorms: [],
    timeStamps: []
  };

  for (const data of accelerationData) {
  const varianceNorm = calculateNormOfVariance(data);
  result.varianceNorms.push(varianceNorm.norm);

  const meanNorm = calculateNormOfMean(data);
  result.meanNorms.push(meanNorm.norm);

  result.timeStamps.push(meanNorm.timestamp);
  }

  return result;
}


const getPetAccelerationNormsData = async (req, res) => {

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

      const dataNorms = calculateNorms(dataCollarThisPet.collar_id);
      
      res.status(201).json({ message: 'Get data pet successfully', data: { variancenorms: (await dataNorms).varianceNorms,  meannorms: (await dataNorms).meanNorms, timestamps: (await dataNorms).timeStamps}});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

async function getMicroRawData(collar_id) {
  const dataCollar = await DataCollar.findOne({ collar_id });
  const { data } = dataCollar;

  const micromeanSend = []

  for (let i = 0; i < data.length; i++) {
    const sample = data[i];
    micromeanSend.push( sample.micro.micromean );
  }

  return micromeanSend;

}

async function getMicroData(collar_id, X) {
  const dataCollar = await DataCollar.findOne({ collar_id });
  const { data } = dataCollar;

  const results = [];
  let sum = {
    micromean: 0
  };
  let squareSum = {
    micromean: 0
  };

  for (let i = 0; i < data.length; i++) {
    const sample = data[i];
    sum.micromean += sample.micro.micromean;
    squareSum.micromean += Math.pow(sample.micro.micromean, 2);

    if ((i + 1) % X === 0) {
      const timestamp = sample.timestamp;
      const N = X;
      const mean = {
        micromean: sum.micromean / N
      };
      const variance = {
        micromean: squareSum.micromean / N - Math.pow(mean.micromean, 2)
      };
      results.push({ timestamp, mean, variance });

      sum = {
        micromean: 0
      };
      squareSum = {
        micromean: 0
      };
    }
  }
  console.log("MICRO RESULTS: " + results);

  return results;
}

// ******************************************************//
// ******************CALCULATE ACCELERATION VARIANCE NORM FUNCTION*****************//
//Calculate Norm of variance of acceleration, gives a 
//timestamp with the norm

function calculateNormOfMicroVariance(microStats) {
  const variance = microStats.variance;
  const norm = Math.sqrt(
    Math.pow(variance.micromean, 2)
  );
  console.log("Timestamp:", microStats.timestamp);
  console.log("Norm of micro variance:", norm);
  return {timestamp: microStats.timestamp, norm: norm};
}

// ******************CALCULATE ACCELERATION MEAN NORM FUNCTION*****************//
//Calculate Norm of mean of acceleration, gives a 
//timestamp with the norm

function calculateNormOfMicroMean(microStats) {
  const mean = microStats.mean;
  const norm = Math.sqrt(
    Math.pow(mean.micromean, 2)
  );
  console.log("Timestamp:", microStats.timestamp);
  console.log("Norm of micro mean:", norm);
  return {timestamp: microStats.timestamp, norm: norm};
}

async function calculateMicroNorms(collar_id) {

  const samples = 3;
  const microStats = await getMicroData(collar_id, samples);

  const result = {
    varianceNorms: [],
    meanNorms: [],
    timeStamps: []
  };

  for (const data of microStats) {
  const varianceNorm = calculateNormOfMicroVariance(data);
  result.varianceNorms.push(varianceNorm.norm);

  const meanNorm = calculateNormOfMicroMean(data);
  result.meanNorms.push(meanNorm.norm);

  result.timeStamps.push(meanNorm.timestamp);
  }

  return result;
}


const getPetMicroNormsData = async (req, res) => {

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

      const dataNorms = calculateMicroNorms(dataCollarThisPet.collar_id);
      const microRaw = await getMicroRawData(dataCollarThisPet.collar_id);
      
      res.status(201).json({ message: 'Get data pet successfully', data: { micromeans: microRaw, variancenorms: (await dataNorms).varianceNorms,  meannorms: (await dataNorms).meanNorms, timestamps: (await dataNorms).timeStamps}});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
    getCollarData,
  createCollarData,
  updateCollarData,
  deleteCollarData,
  addDataCollar,
  removeDataCollar,
  saveDataCollar,
  deleteAllDataCollars,
  calculateNormOfMean,
  calculateNormOfVariance,
  getAccelerometerData,
  calculateNorms,
  checkPetDistance,
  calculateDistance,
  getPetAccelerationNormsData,
  getMicroData,
  calculateNormOfMicroMean,
  calculateNormOfMicroVariance,
  getPetMicroNormsData,
  calculateMicroNorms,
  getMicroRawData
};
