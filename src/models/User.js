const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  firebaseToken: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);