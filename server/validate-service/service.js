const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const auth = require('../middleware/authorization');
const multer = require('multer');
const parse = require('../middleware/uploadParseCsv');

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

// CSV File to String (in memory load)
const uploadMulterMiddleware = multer({storage: multer.memoryStorage()});

// Services
app.post('/api/chart/validate', auth, uploadMulterMiddleware.single('file'), parse, controller.postValidate);

// Error 404
app.use((req, res) => {
  res.status(404).json({message: 'not found'});
});

// Connect to Database
mongoose.connect(`mongodb://mongodb:27017/myCharts`, {
  useNewUrlParser: true,
}).then(() => {
  console.log('[Validate Service]: Database Connected.');
}).catch(error => {
  console.error(error);
});

// Host Service
app.listen(3008, () => {
  console.log('[Validate Service]: Started on port 3008');
});