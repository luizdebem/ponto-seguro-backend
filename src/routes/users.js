const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @TODO @luizdebem update, delete, retrieve, login e logout

router.post('/', async (req, res) => {
  const { fullName, email, password, isAdmin } = req.body;

  try {
    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) throw error;

      const user = new User({
        fullName,
        email,
        password: hash,
        isAdmin
      });
      const data = await user.save();

      jwt.sign(
        { id: user.id },
        'jwt-secret',
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          res.status(200).json({ data: { user, token } });
        }
      );
      
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;