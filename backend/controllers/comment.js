const models = require('../models');
const jwt = require('../middlewares/jwt');


exports.createComment = async (req, res, next) => {
    
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    
    const postId= req.body.postId;
    const title = req.body.title;
    const content = req.body.content;

    console.log( postId, title, content )

    try {
        const user = await models.User.findOne({ where: { id: userId } })
        // const post = await models.Post.findOne({ where: { id: postId } })
        const comment = await models.Comment.create({
            title: title,
            content: content,
            likes: 0,
            UserId: user.id,
            PostId: postId
        })

        return res.json(comment)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({err});
    }
}

exports.modifyComment = (req, res, next) => {
    
}

exports.deleteComment = (req, res, next) => {
    
}

exports.getAllComments = async (req, res, next) => {

    try {
        const comments = await models.Comment.findAll({ include: ['post', 'user'] })
        console.log(res.json(comments))
        return res.json(comments)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({err});
    }
}