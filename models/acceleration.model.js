const mongoose = require('mongoose');

const accelerationSchema = new mongoose.Schema({
    collarRefID: { type: mongoose.Schema.Types.ObjectId, ref: 'DataCollar'},
    timestamp: {
      type: Date,
      required: true
    },
    mean: {
      acceleration_x: {
        type: Number,
        required: true
      },
      acceleration_y: {
        type: Number,
        required: true
      },
      acceleration_z: {
        type: Number,
        required: true
      }
    },
    variance: {
      acceleration_x: {
        type: Number,
        required: true
      },
      acceleration_y: {
        type: Number,
        required: true
      },
      acceleration_z: {
        type: Number,
        required: true
      }
    }
  });
  
  const Acceleration = mongoose.model('Acceleration', accelerationSchema);


module.exports = Acceleration;