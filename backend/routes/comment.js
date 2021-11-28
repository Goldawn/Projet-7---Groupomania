const express = require('express');
const router = express.Router({ mergeParams: true});

const commentCtrl = require('../controllers/comment');

router.post('/new', commentCtrl.createComment);
router.put('/:commentId', commentCtrl.modifyComment)
router.delete('/:commentId', commentCtrl.deleteComment)
router.get('/:userId/', commentCtrl.getAllCommentsFromUser);
router.get('/', commentCtrl.getCommentsFromPost);



module.exports = router;