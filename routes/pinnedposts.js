const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const ppsts = express.Router();
 
 ppsts.get('/pinnedposts', (req, res) => {
    PinnedPosts.findAll()
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 
 ppsts.get('/pinnedposts/:id', (req, res) => {
    PinnedPosts.findOne({where : {id : req.params.id}})
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 module.exports = ppsts;