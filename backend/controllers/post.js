const models = require('../models');
const jwt = require('../middlewares/jwt');
const fs = require('fs');


exports.createPost = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)

    
    const title = req.body.title;
    const content = req.body.content;
    const attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    try {
        const user = await models.User.findOne({ where: { id: userId } })
        console.log(user.id)

        const post = await models.Post.create({
            title: title,
            content: content,
            attachment: attachment,
            likesCounter: 0,
            dislikesCounter: 0,
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

    console.log('test route put')

    const title = req.body.title;
    const content = req.body.content;
    const attachment =  req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null ;

    if(attachment) {
        try {
            const post = await models.Post.findOne({ where: { id: userId, id: postId } })
    
            
            const filename = post.attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                    post.title = title,
                    post.content = content
                    post.attachment = attachment;
                    post.save()
                })
    
            return res.json(post)
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({ 'error': 'Something went wrong' });
        }
    } else {
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
}

exports.deletePost = async (req, res, next) => {
    
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    const postId = parseInt(req.params.postId);

    try {
        const post = await models.Post.findOne({ where: { userId: userId, id: postId } })
        console.log(post.id)

        const filename = post.attachment.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            post.destroy()
        })
      
        res.status(200).json({ message : 'post deleted' })
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }
}

exports.getAllPosts = async (req, res, next) => {

    try {
        const posts = await models.Post.findAll({ include: ['user', 'comments'] })
        
        return res.json(posts)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ 'error': err });
    }
}

exports.getAllPostsFromUser = async (req, res, next) => {

    const userId = parseInt(req.params.userId);

    try {
        const posts = await models.Post.findAll({ 
            where: { userId: userId },
            include: ['user', 'comments'] })
        
        return res.json(posts)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ 'error': err });
    }
}

exports.getSinglePost = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    const postId = parseInt(req.params.postId);
    console.log(postId)

    try {
        const post = await models.Post.findOne({
            where: { id: postId },
            include: ['user', 'comments'] })
        
        return res.json(post)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ 'error': err });
    }
}