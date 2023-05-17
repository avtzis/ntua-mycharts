const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import Routes
const user = require('./routes/user');
const chart = require('./routes/chart');
const credits = require('./routes/credits');

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: (origin, callback) => callback(null, true),
}));

// Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Routes
//app.use('/api/user', user);
app.use('/api/chart', chart);
//app.use('/api/credits', credits);

// Error 404
app.use((req, res) => {
  res.status(404).json({message: 'not found'});
});

// Export App
module.exports = app;