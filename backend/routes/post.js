const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.post('/new', postCtrl.createPost);
router.put('/:postId', postCtrl.modifyPost)
router.delete('/:postId', postCtrl.deletePost)
router.get('/', postCtrl.getAllPosts);



module.exports = router;