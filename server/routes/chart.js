const express = require('express');

// Controllers
const chartController = require('../controllers/chartController');

// Middleware
const auth = require('../middleware/authorization');
const parse = require('../middleware/uploadParseCsv');

// Router
const router = express.Router();

// Endpoints
router.post('/validate', auth, parse, chartController.postValidate);
router.post('/create', auth, chartController.postChart);

router.get('/download/:id', auth, chartController.getChart);

router.get('/template', chartController.getTemplates);

// Export Router
module.exports = router;