const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// @TODO @luizdebem - better response, error handling;
// @TODO @luizdebem - soft delete

router.get('/', async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const report = await Report.findById(id);
  res.json(report);
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

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  await Report.updateOne({ _id: id }, { $set: req.body });
  res.json({});
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Report.remove({ _id: id });
  res.json({});
});

module.exports = router;