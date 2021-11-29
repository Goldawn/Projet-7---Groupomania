const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile', userCtrl.getUserProfile);
router.put('/profile', multer ,userCtrl.updateUserProfile);
router.delete('/profile', userCtrl.deleteUserProfile);

// router.get('/', auth, stuffCtrl.getAllPosts);


module.exports = router;