const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const reportsRoute = require('./routes/reports');
app.use('/reports', reportsRoute);

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

app.get('/', (req, res) => {
  res.json({ uptime: process.uptime() });
});

const mongodbURI = `mongodb+srv://luizdebem:${process.env.MONGODB_PASSWORD}@pontoseguro.xlm7x.mongodb.net/PontoSeguro?retryWrites=true&w=majority`;

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to DB');
});


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});