const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @TODO @luizdebem update, delete, retrieve, login e logout
// @TODO @luizdebem validations

router.post('/signup', async (req, res) => {
  const { fullName, email, password, isAdmin } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'User already exists' });

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
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          res.status(200).json({ data: { user, token } });
        }
      );

    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(400).json({ error: 'Invalid credentials.' });

    jwt.sign(
      { id: user.id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ data: { user, token } });
      }
    );

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;