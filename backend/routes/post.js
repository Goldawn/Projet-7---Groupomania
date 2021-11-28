const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');

router.post('/new', multer, postCtrl.createPost);
router.put('/:postId', multer, postCtrl.modifyPost);
router.delete('/:postId', postCtrl.deletePost);
router.get('/:userId', postCtrl.getAllPostsFromUser);
router.get('/id/:postId', postCtrl.getSinglePost);
router.get('/', postCtrl.getAllPosts);

module.exports = router;