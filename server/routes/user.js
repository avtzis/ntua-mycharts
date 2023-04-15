const express = require('express');

// Controllers
const userController = require('../controllers/userController');

// Middleware
const auth = require('../middleware/authorization');

// Router
const router = express.Router();

// Endpoints
router.get('/', auth, userController.getUser);

router.post('/login', userController.postLogin);
router.post('/logout', auth, userController.postLogout);

// Export Router
module.exports = router;