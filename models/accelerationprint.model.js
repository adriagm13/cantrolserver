const mongoose = require('mongoose');

const accelerationPrintSchema = new mongoose.Schema({
    collarRefID: { type: mongoose.Schema.Types.ObjectId, ref: 'DataCollar'},
    x: {
      type: Date,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  });
  
const AccelerationPrint = mongoose.model('AccelerationPrint', accelerationPrintSchema);


module.exports = AccelerationPrint;
