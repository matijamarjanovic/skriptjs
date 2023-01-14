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

notif.post('/notifications/', (req, res) => {
    Notifications.create({ postId: req.body.postId, notifType: req.body.notifType,  content: req.body.content })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

notif.put('/notifications/:id', (req, res) => {
    Notifications.findOne({where : {id : req.params.id}})
        .then( notif => {
                notif.notifType = req.body.notifType;;
                notif.postId = req.body.postId;
                notif.content = req.body.content;

               notif.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
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