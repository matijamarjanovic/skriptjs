const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const lk = express.Router();
 lk.use(express.json());
 lk.use(express.urlencoded({ extended: true }));

 lk.get('/likes', (req, res) =>{
    Likes.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

module.exports = lk;