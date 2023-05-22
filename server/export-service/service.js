const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const auth = require('../middleware/authorization');

// Controller
const controller = require('./controller');

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Services
app.post('/api/chart/create', auth, controller.postChart);

// Error 404
app.use((req, res) => {
  res.status(404).json({message: 'not found'});
});

// Connect to Database
mongoose.connect(`mongodb://mongodb:27017/myCharts`, {
  useNewUrlParser: true,
}).then(() => {
  console.log('[Export Service]: Database Connected.');
}).catch(error => {
  console.error(error);
});

// Host Service
app.listen(3007, () => {
  console.log('[Export Service]: Started on port 3007');
});