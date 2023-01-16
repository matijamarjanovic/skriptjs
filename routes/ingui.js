const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const int = express.Router();
 int.use(express.json());
 int.use(express.urlencoded({ extended: true }));

 int.get('/interests', (req, res) =>{
    Interests.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

module.exports = int;