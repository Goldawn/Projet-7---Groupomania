const express = require('express');
const router = express.Router({ mergeParams: true});

const likeCtrl = require('../controllers/like');

router.post('/like', likeCtrl.createLike);
// router.post('/dislike', likeCtrl.dislikePost);

module.exports = router;