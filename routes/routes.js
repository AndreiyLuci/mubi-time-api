const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Auth
router.post('/login', authController.login);

router.get('/users/me', authMiddleware.isAuthenticated, userController.getCurrentUser);


module.exports = router;