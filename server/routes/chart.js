const express = require('express');
const multer = require('multer');
// Controllers
const chartController = require('../controllers/chartController');

// Middleware
const auth = require('../middleware/authorization');
const parse = require('../middleware/uploadParseCsv');

// Router
const router = express.Router();

// CSV File to String (in memory load)
const uploadMulterMiddleware = multer({storage: multer.memoryStorage()});

// Endpoints
router.post('/validate', auth,uploadMulterMiddleware.single('file'), parse, chartController.postValidate);
router.post('/create', auth, chartController.postChart);

// router.get('/download/:id', auth, chartController.getChart);

// router.get('/template', auth, chartController.getTemplates);
// router.get('/preview', chartController.getPreviews);

// Export Router
module.exports = router;