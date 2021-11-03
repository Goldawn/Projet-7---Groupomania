const bcrypt = require('bcrypt');
const jwt = require('../middlewares/jwt');
const models = require('../models');

exports.signup = (req, res, next) => {

    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio = req.body.bio;
    
    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(function(userFound) {
        if (!userFound) {

            bcrypt.hash(password, 5, function( err, bcryptedPassword) {
                let newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0
                })
                .then(function(newUser) {
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user' });
                });
            });
        }

        else {
            return res-status(409).json({ 'error': 'user already exists' });
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
    });

};

exports.login = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    models.User.findOne({
        where: { email: email }
    })
    .then(function(userFound) {
        if (userFound) {

            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                if(resBycrypt) {
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': jwt.generateTokenForUser(userFound)
                    });
                }
                else {
                    return res.status(403).json({ 'error': 'invalid password' });
                }
            })  
        }
        else {
            return res-status(404).json({ 'error': 'user does not exist' });
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
    });
};

exports.getUserProfile = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)

    try {
        const user = await models.User.findOne({ 
            attributes: ['id', 'email', 'username', 'bio'],
            where: { id: userId } ,
            include: ['posts', 'Tests']
        })
        // const userPosts = user.posts.map(async(post) => {
        //     const comments = await models.Test.findAll({ where: {id: post.id} })
        //     console.log(comments)
        //     const postWithComments = { ...post, tests: comments }
        //     console.log("BITE")
        //     console.log(postWithComments)
        //     return postWithComments
        // })
        

        return res.json(user)
        // return res.json(userPosts)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }
   
};

exports.updateUserProfile = async (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);
    const email = req.body.email;
    const username = req.body.username;
    const bio = req.body.bio;

    try {
        const user = await models.User.findOne({ where: { id: userId } })

        user.username = username
        user.email = email
        user.bio = bio

        await user.save()

        return res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ 'error': 'Something went wrong' });
    }
}

exports.deleteUserProfile = (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)

    if (userId < 0)
        return res.status(400).json({ 'error' : 'wrong token' });

    models.User.findOne({
        where: { id: userId }
    })
    .then(user => user.destroy())
    .then(user => res.status(200).json({ message : 'user deleted' }))
    .catch( error => res.status(404).json({ error}));
};