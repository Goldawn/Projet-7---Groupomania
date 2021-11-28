const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/', commentCtrl.createComment);
// router.put('/', commentCtrl.modifyComment);
// router.delete('/', commentCtrl.deleteComment);
router.get('/', commentCtrl.getAllComments);



module.exports = router;