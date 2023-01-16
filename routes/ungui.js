const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const un = express.Router();
 un.use(express.json());
 un.use(express.urlencoded({ extended: true }));

 un.get('/usersnotifications', (req, res) =>{
    UsersNotifications.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

module.exports = un;