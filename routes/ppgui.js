const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const pp = express.Router();
 pp.use(express.json());
 pp.use(express.urlencoded({ extended: true }));

 pp.get('/pinnedposts', (req, res) =>{
    PinnedPosts.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

module.exports = pp;