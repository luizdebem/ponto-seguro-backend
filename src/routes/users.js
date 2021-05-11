const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @TODO @luizdebem update, delete, retrieve, login e logout

router.post('/', async (req, res) => {
  const { fullName, email, isAdmin, firebaseToken } = req.body;

  try {
    const user = new User({
      fullName,
      email,
      isAdmin,
      firebaseToken
    });
    const data = await user.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;