const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

router.get('/', (req, res) => {
  res.json({ message: 'Coming soon!' });
});

router.post('/', async (req, res) => {
  const { geolocation, userID, details } = req.body;
  const report = new Report({
    geolocation,
    userID,
    details
  });
  const data = await report.save();
  res.json(data);
});

module.exports = router;