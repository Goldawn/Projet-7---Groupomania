const models   = require('../models');
const jwt = require('../middlewares/jwt');

// Constants

const DISLIKED = 0;
const LIKED    = 1;

exports.likePost = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);

    const postId = parseInt(req.params.postId);

    if (postId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
    }

    try {
        const post = await models.Post.findOne({ where: { id: postId } })
        const user = await models.User.findOne({ where: { id: userId } })
        // console.log(post, user)

        console.log(models)

 


        try {
            const like = models.Post.findAll({
                include: [{
                    model:models.like, 
                    through: { where: { userId: userId, postId: postId } }
                }]
            })
        } catch(errs) {
            console.log(errs)
        }

        console.log("jioj ",like)
        if (!like) {
            post.addUser(user, { isLike: LIKED })
            post.update({ likesCounter: post.likesCounter +1})
                return res.status(200).json('post updated')
        } else {
            if(like.isLike === DISLIKED) {
            like.update({ isLike: LIKED })
            post.update({ likesCounter: post.dislikesCounter -1})
            post.update({ likesCounter: post.likesCounter +1})
                return res.status(200).json('post updated else')
            }
            else {
                res.status(409).json({ 'error': 'post already liked' });
            }
        }           
    }

    catch(err) {
        return res.status(500).json({ 'error': err });
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

        console.log(postId);
        const post = models.Post.findOne({ where: { id: postId } })
        const user = models.User.findOne({ where: { id: userId } })
        const like = models.Like.findOne({ where : { userId: userId, postId: postId } })
        
        if (!like) {
            post.addUser(user, { isLike: DISLIKED })
            post.update({ dislikesCounter: post.dislikesCounter +1})
        } else {
            if(like.isLike === LIKED) {
            like.update({ isLike: DISLIKED })
            post.update({ Counter: post.dislikesCounter +1})
            post.update({ likesCounter: post.likesCounter -1})
            }
            else {
                res.status(409).json({ 'error': 'post already liked' });
            }
        }   

    }

    catch(err) {
        return res.status(500).json({ 'error': 'Something went wrong' });
    }
}

