const models = require('../models');
const jwt = require('../middlewares/jwt');


exports.createPost = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)

    
    const title = req.body.title;
    const content = req.body.content;
    // const attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log(userId)

    try {
        const user = await models.User.findOne({ where: { id: userId } })
        console.log(user.id)

        const post = await models.Post.create({
            title: title,
            content: content,
            // attachment: attachment,
            likes: 0,
            userId: user.id
        })

        return res.json(post)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ 'error': 'Something went wrong' });
    }
}

exports.modifyPost = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    const postId = parseInt(req.params.postId);

    const title = req.body.title;
    const content = req.body.content;

    try {
        const post = await models.Post.findOne({ where: { id: userId, id: postId } })

            post.title = title,
            post.content = content

            await post.save()

        return res.json(post)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ 'error': 'Something went wrong' });
    }
}

exports.deletePost = async (req, res, next) => {
    
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    const postId = parseInt(req.params.postId);

    try {
        const post = await models.Post.findOne({ where: { userId: userId, id: postId } })
        console.log(post.id)
        
        await post.destroy();

        res.status(200).json({ message : 'post deleted' })
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

}

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await models.Post.findAll({ include: ['user', 'Tests'] })
        
        return res.json(posts)
    }
    catch {
        console.log(err)
        return res.status(500).json({ 'error': 'Something went wrong' });
    }
}