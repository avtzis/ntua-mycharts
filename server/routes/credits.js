const express = require('express');

// Controllers
const creditsController = require('../controllers/creditsController');

// Middleware
const auth = require('../middleware/authorization');

// Router
const router = express.Router();

// Endpoints
router.get('/', auth, creditsController.getCredits);
router.post('/purchase', auth, creditsController.postPurchase);
router.get('/success', auth, creditsController.getSuccess);

// Export Router
module.exports = router;