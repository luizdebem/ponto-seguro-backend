const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

const auth = require('../middlewares/auth');

// @TODO @luizdebem - soft delete

router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json({ data: reports });
  } catch (error) {
    res.status(500).json({ error: 'Unknown error on Model.find()' });
  }
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findById(id);
    if (!report) return res.status(404).json(report);
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: 'Unable to find the report' });
  }
});

router.post('/', auth, async (req, res) => {
  const { geolocation, userID, details } = req.body;

  try {
    const report = new Report({
      geolocation,
      userID,
      details
    });
    const data = await report.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.updateOne({ _id: id }, { $set: req.body });
    res.status(200).json({ message: 'Updated report' });
  } catch (error) {
    res.status(404).json({ error: 'Report not found' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Report.deleteOne({ _id: id });
    res.status(200).json({ message: 'Deleted report' });
  } catch (error) {
    res.status(404).json({ error: 'Report not found' });
  }
});

module.exports = router;