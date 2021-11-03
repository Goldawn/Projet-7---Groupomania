const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

router.post('/like', likeCtrl.likePost);
router.get('/dislike', likeCtrl.dislikePost);



module.exports = router;