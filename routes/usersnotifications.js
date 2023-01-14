const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const usrsnotif = express.Router();
usrsnotif.use(express.json());
usrsnotif.use(express.urlencoded({ extended: true }));

usrsnotif.get('/usersnotifications', (req, res) => {
    UsersNotifications.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


usrsnotif.get('/usersnotifications/:id', (req, res) => {
    UsersNotifications.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

usrsnotif.post('/usersnotifications/', (req, res) => {
    UsersNotifications.create({ userId: req.body.userId, notificationId: req.body.notificationId})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

usrsnotif.put('/usersnotifications/:id', (req, res) => {
    UsersNotifications.findOne({where : {id : req.params.id}})
        .then( usrsnotif => {
               usrsnotif.userId = req.body.userId;
               usrsnotif.notificationId = req.body.notificationId;

               usrsnotif.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

usrsnotif.delete('/usersnotifications/:id', (req, res) => {
    UsersNotifications.findOne({where : {id : req.params.id}})
    .then( usrsnotif => {
        usrsnotif.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = usrsnotif;