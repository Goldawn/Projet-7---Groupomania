const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');

router.post('/new', multer, postCtrl.createPost);
router.put('/:postId', postCtrl.modifyPost);
router.delete('/:postId', postCtrl.deletePost);
router.get('/', postCtrl.getAllPosts);

module.exports = router;