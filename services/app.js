require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const commonRouter = require('./src/api/common.router');


app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

app.use(express.json()); // Parses JSON request body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data


app.use('/api/common', commonRouter);

// Default route
app.get('/', (req, res) => {
  res.send(`<h1>API Running on port ${process.env.FRONT_END_PORT}</h1>`);
});

// app.get('/*', (req, res) => {
//   res.sendFile('index.html', { root: _orderTrackingFolder });
// });

// Start the server
app.listen(process.env.FRONT_END_PORT, () => {
  console.log(`Server is up and running on port: ${process.env.FRONT_END_PORT}`);
});
