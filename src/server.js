const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

app.use(express.json());

const reportsRoute = require('./routes/reports');
app.use('/reports', reportsRoute);

app.get('/', (req, res) => {
  res.json({ uptime: process.uptime() });
});

mongoose.connect('mongodb://localhost/ponto-seguro', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to DB');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});