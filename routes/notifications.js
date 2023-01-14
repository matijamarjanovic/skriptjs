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
    Notifications.create({ notifType: req.body.notifType, postId: req.body.postId })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

notif.put('/notifications/:id', (req, res) => {
    Notifications.findOne({where : {id : req.params.id}})
        .then( notif => {
               lpst.notifType = req.body.notifType;;
               lpst.postId = req.body.postId;
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