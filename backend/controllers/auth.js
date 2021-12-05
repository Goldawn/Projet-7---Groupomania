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