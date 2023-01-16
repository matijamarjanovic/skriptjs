const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const ps = express.Router();
 ps.use(express.json());
 ps.use(express.urlencoded({ extended: true }));

 ps.get('/posts', (req, res) =>{
    Posts.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

module.exports = ps;