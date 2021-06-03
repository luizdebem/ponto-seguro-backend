const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
}, { _id: false });

const BusinessSchema = new mongoose.Schema({
  about: { 
    type: String,
    required: true
  },
  name: { 
    type: String,
    required: true
  },
  geolocation: {
    type: GeoSchema,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Business', BusinessSchema);