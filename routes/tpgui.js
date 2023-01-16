const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const tp = express.Router();
 tp.use(express.json());
 tp.use(express.urlencoded({ extended: true }));

 tp.get('/topics', (req, res) =>{
    Topics.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

module.exports = tp;