// Import
const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration); // Method for registration
router.post('/login', userController.login); // Method for login
router.get('/auth', authMiddleware, userController.check); // User check for authorization



module.exports = router