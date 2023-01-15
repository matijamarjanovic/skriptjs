const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const notif = express.Router();
notif.use(express.json());
notif.use(express.urlencoded({ extended: true }));

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
    const empty = true;

    if(req.body.content === '' ||req.body.notifType === '' || req.body.postId === '') 
        empty = false;

    if ((req.body.content === 'Your post has a new comment.' && req.body.notifType === 'comment') ||
            (req.body.content === 'Your post has a new like.' && req.body.notifType === 'like'))
            goodNotif = true;
    
    if (existingPost && goodNotif && !empty){
        Notifications.create({ postId: req.body.postId, notifType: req.body.notifType,  content: req.body.content })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(empty) {
        res.status(400).send({message: 'Please fill all the fields!'});
    }else{
        res.status(400).send({message: 'Error creating a notification, invalid post ID or notification is not written correctly.'});
    }
});

notif.put('/notifications/:id', async(req, res) => {
    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const goodNotif = false;
    const empty = true;

    if(req.body.content === '' ||req.body.notifType === '' || req.body.postId === '') 
        empty = false;

    if ((req.body.content === 'Your post has a new comment.' && req.body.notifType === 'comment') ||
            (req.body.content === 'Your post has a new like.' && req.body.notifType === 'like'))
            goodNotif = true;
    
    if (existingPost && goodNotif && !empty){
        Notifications.findOne({where : {id : req.params.id}})
        .then( notif => {
                notif.notifType = req.body.notifType;;
                notif.postId = req.body.postId;
                notif.content = req.body.content;

               notif.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(empty) {
        res.status(400).send({message: 'Please fill all the fields!'});
    }else{
        res.status(400).send({message: 'Error creating a notification, invalid post ID or notification is not written correctly.'});
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