const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const favController = require('../controllers/Fav.controller');
const upload = require('../config/storage.config');

// Login
router.post('/login', authMiddleware.isNotAuthenticated, authController.login);

//Register
router.post('/sign-up', authMiddleware.isNotAuthenticated, upload.single('avatar'), authController.register )
router.post("/api/v1/auth/google", authController.googleRegister)

// Users
router.get('/users/me', authMiddleware.isAuthenticated, userController.getCurrentUser)
// ("/user/favs")

// Favs
router.post('/movies/:id/fav', authMiddleware.isAuthenticated, favController.markMovieFav)
router.get('/movies/:id/fav', authMiddleware.isAuthenticated, favController.getMovieFav)
router.post('/tvshows/:id/fav', authMiddleware.isAuthenticated, favController.markTVFav)
router.get('/tvshows/:id/fav', authMiddleware.isAuthenticated, favController.getTVFav)

module.exports = router;