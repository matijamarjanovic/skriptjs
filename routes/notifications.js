const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const notif = express.Router();
notif.use(express.json());
notif.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
        if (err) return res.redirect(301, '/login');

        req.user = usr;

        next();
    });
}
notif.use(authToken);

notif.get('/notifications', (req, res) => {
    Notifications.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


notif.get('/notifications/:id', (req, res) => {
    Notifications.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

notif.post('/notifications/', async(req, res) => {
    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const goodNotif = false;
    let empty = true;

    if(req.body.content === '' ||req.body.notifType === '' || req.body.postId === '') 
        empty = false;

    let goodInt = true;
    if (!Number.isInteger(req.body.postId))
         goodInt = false;

    if ((req.body.content === 'Your post has a new comment.' && req.body.notifType === 'comment') ||
            (req.body.content === 'Your post has a new like.' && req.body.notifType === 'like'))
            goodNotif = true;
    
    if (goodNotif && goodInt){
        Notifications.create({ postId: req.body.postId, notifType: req.body.notifType,  content: req.body.content })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(!goodInt) {
        res.status(400).send({message: 'Use exclusively integers for IDs'});
    }else{
        res.status(400).send({message: 'Error creating a notification, invalid post ID or notification is not written correctly.'});
    }
});

notif.put('/notifications/:id', async(req, res) => {
    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const goodNotif = false;
    let empty = true;

    if(req.body.content === '' ||req.body.notifType === '' || req.body.postId === '') 
        empty = false;

    let goodInt = true;
    if (!Number.isInteger(req.body.postId))
         goodInt = false;

    if ((req.body.content === 'Your post has a new comment.' && req.body.notifType === 'comment') ||
            (req.body.content === 'Your post has a new like.' && req.body.notifType === 'like'))
            goodNotif = true;
    
    if (goodNotif && goodInt){
        Notifications.findOne({where : {id : req.params.id}})
        .then( notif => {
                notif.notifType = req.body.notifType;;
                notif.postId = req.body.postId;
                notif.content = req.body.content;

               notif.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(!goodInt) {
        res.status(400).send({message: 'Use exclusively integers for IDs'});
    }else{
        res.status(400).send({message: 'Error updating a notification, invalid post ID or notification is not written correctly.'});
    }



});

notif.delete('/notifications/:id', (req, res) => {
    Notifications.findOne({where : {id : req.params.id}})
    .then( notif => {
        notif.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = notif;