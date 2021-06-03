const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

const auth = require('../middlewares/auth');

// @TODO @luizdebem - soft delete

router.get('/', auth, async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json({ data: businesses });
  } catch (error) {
    res.status(500).json({ error: 'Unknown error on Model.find()' });
  }
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const business = await Business.findById(id);
    if (!business) return res.status(404).json(business);
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ error: 'Unable to find the business' });
  }
});

router.post('/', auth, async (req, res) => {
  const { about, name, geolocation } = req.body;

  try {
    const business = new Business({ about, name, geolocation });
    const data = await business.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const business = await Business.updateOne({ _id: id }, { $set: req.body });
    res.status(200).json({ message: 'Updated business' });
  } catch (error) {
    res.status(404).json({ error: 'Business not found' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Business.deleteOne({ _id: id });
    res.status(200).json({ message: 'Deleted business' });
  } catch (error) {
    res.status(404).json({ error: 'Business not found' });
  }
});

module.exports = router;