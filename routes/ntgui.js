const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const nt = express.Router();
 nt.use(express.json());
 nt.use(express.urlencoded({ extended: true }));

 nt.get('/notifications', (req, res) =>{
    Notifications.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

module.exports = nt;