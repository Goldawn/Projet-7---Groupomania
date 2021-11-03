const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile', userCtrl.getUserProfile);
router.put('/profile', userCtrl.updateUserProfile);
router.delete('/profile', userCtrl.deleteUserProfile);

// router.get('/', auth, stuffCtrl.getAllPosts);


module.exports = router;