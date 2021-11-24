const models   = require('../models');
const jwt = require('../middlewares/jwt');

// Constants

const DISLIKED = 0;
const LIKED    = 1;

exports.likePost = (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);

    const postId = parseInt(req.params.postId);

    if (postId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    }
    console.log('12')

    try {

        const post = models.Post.findOne({ where: { id: postId } })
        const user = models.User.findOne({ where: { id: userId } })
        const like = models.Like.findOne({ where : { userId: userId, postId: postId } })

        if (!like) {
            post.addUser(user, { isLike: LIKED })
        } else {
            if(like.isLike === DISLIKED) {
            like.update({ isLike: LIKED,})
            }
            else {
                res.status(409).json({ 'error': 'post already liked' });
            }
        }   

        post.update({ likes: post.likes +1})
    }

    catch {
        console.log(err)
        return res.status(500).json({ 'error': 'Something went wrong' });
    }
    
}

exports.dislikePost = (req, res, next) => {
    
    
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);

    const postId = parseInt(req.params.postId);

    if (postId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    }

    try {

        const post = models.Post.findOne({ where: { id: postId } })
        console.log( "1" )
        const user = models.User.findOne({ where: { id: userId } })
        console.log( "1" )
        const like = models.Like.findOne({ where : { userId: userId, postId: postId } })
        console.log( "1" )

        

        return res.json(like)
        // if (!like) {
        //     post.addUser(user, { isLike: LIKED })
        // } else {
        //     if(like.isLike === DISLIKED) {
        //     like.update({ isLike: LIKED,})
        //     }
        //     else {
        //         res.status(409).json({ 'error': 'post already liked' });
        //     }
        // }   

        // post.update({ likes: post.likes +1})
    }

    catch {
        console.log(err)
        return res.status(500).json({ 'error': 'Something went wrong' });
    }

}

