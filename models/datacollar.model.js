const mongoose = require('mongoose');
const DataCollarSchema = new mongoose.Schema({
    collar_id: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    petowner: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
    data: [{
        _id: false,
        timestamp: { type: Date },
        acceleration_x: { type: Number },
        acceleration_y: { type: Number },
        acceleration_z: { type: Number },
        position: {
            latitude: { type: Number },
            longitude: { type: Number },
            altitude: { type: Number },
        },
        micro: {
            micromean: { type: Number },
        },
    }],
});


const DataCollar = mongoose.model('DataCollar', DataCollarSchema);

module.exports = DataCollar;

