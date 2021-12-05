const bcrypt = require('bcrypt');
const jwt = require('../middlewares/jwt');
const models = require('../models');
const fs = require('fs');

exports.signup = (req, res, next) => {

    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio = req.body.bio;
    let attachment = ''
    
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
                    attachment: attachment,
                    isAdmin: 0
                })
                .then(function(newUser) {
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })
                .catch((err) => {
                    return res.status(500).json({ 'error': err });
                });
            });
        }

        else {
            return res-status(409).json({ 'error': 'user already exists' });
        }
    })
    .catch((err) => {
        return res.status(500).json({ 'error': err });
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
            attributes: ['id', 'email', 'username', 'bio', 'attachment'],
            where: { id: userId } ,
            include: ['posts', 'comments']
        })
        console.log(user)     

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
    const attachment =  req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null ;

    if(attachment) {
        try {
            const user = await models.User.findOne({ where: { id: userId } })
            
            const filename = user.attachment.split('/images/')[1];

            if(user.attachment) {
                fs.unlink(`images/${filename}`, () => {
                    user.username = username
                    user.email = email
                    user.bio = bio
                    user.attachment = attachment
                    user.save()
                })
                return res.json(user)

            } else {
                user.username = username
                user.email = email
                user.bio = bio
                user.attachment = attachment
                await user.save()

                return res.json(user)
            }



        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ 'error': 'Something went wrong' });
        }
    } else {
        try {
            const user = await models.User.findOne({ where: { id: userId } })
    
                user.username = username
                user.email = email
                user.bio = bio
    
                await user.save()
    
            return res.json(user)
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({ 'error': 'Something went wrong' });
        }
    }
}

exports.deleteUserProfile = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)

    try {
        const user = await models.User.findOne({ where: { id: userId } })

        const filename = user.attachment.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            user.destroy()
        })
        res.status(200).json({ message : 'user deleted' })
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

};

exports.getAuth = async (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
        if (userId < 0) {
            return res.status(401).json({ message : 'token is wrong or has expired'})
        } else {            
            return res.status(200).json({ message : 'you are now authentified'})   
        }
}