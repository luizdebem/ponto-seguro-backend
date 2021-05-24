const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
}, { _id: false });

const ReportSchema = new mongoose.Schema({
  geolocation: {
    type: GeoSchema,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['PEDESTRIAN', 'DRIVER'],
    required: true
  },
  details: { 
    type: String,
    required: false
  },
  reportType: {
    type: String,
    enum: ['THEFT', 'ROBBERY'],
    required: true
  },
  when: {
    type: Date,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);