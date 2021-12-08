const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/signup-admin', userCtrl.adminSignup);
router.post('/login', userCtrl.login);
router.get('/profile', userCtrl.getUserProfile);
router.put('/profile', multer ,userCtrl.updateUserProfile);
router.delete('/profile', userCtrl.deleteUserProfile);
router.get('/auth', userCtrl.getAuth);

// router.get('/', auth, stuffCtrl.getAllPosts);


module.exports = router;