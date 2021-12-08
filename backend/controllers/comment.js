const models = require('../models');
const jwt = require('../middlewares/jwt');


exports.createComment = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);
    const postId = parseInt(req.params.postId);

    const content = req.body.content;

    try {
        const user = await models.User.findOne({ where: { id: userId } })
        const post = await models.Post.findOne({ where: { id: postId } })
        const comment = await models.Comment.create({
            content: content,
            userId: user.id,
            postId: post.id
        })

        return res.json(comment)
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

}

exports.modifyComment = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const commentId = parseInt(req.params.commentId);

    const title = req.body.title;
    const content = req.body.content;

    try {
        const comment = await models.Comment.findOne({ where: { id: commentId } })

            comment.content = content

            await comment.save()

        return res.json(comment)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }
}

exports.deleteComment = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const commentId = parseInt(req.params.commentId);

    try {
        const comment = await models.Comment.findOne({ where: { id: commentId } })
        
            await comment.destroy();

        res.status(200).json({ message : 'comment deleted' })
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

}

exports.getAllCommentsFromUser = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)

    try {
        const comments = await models.Comment.findAll({ 
            where: {userId: userId},
            include: ['user', 'Post'] 
        })
        
        return res.json(comments)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

}

exports.getCommentsFromPost = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    const postId = parseInt(req.params.postId);

    try {
        const comments = await models.Comment.findAll({ 
            where: {postId: postId},
            include: ['user', 'Post'],
            order: [['createdAt', "DESC"]]
        })
        
        return res.json(comments)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

}
