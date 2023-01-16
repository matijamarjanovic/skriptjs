const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const lp = express.Router();
 lp.use(express.json());
 lp.use(express.urlencoded({ extended: true }));

 lp.get('/likedposts', (req, res) =>{
    LikedPosts.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

module.exports = lp;