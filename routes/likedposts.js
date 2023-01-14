const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const lpst = express.Router();
 
 lpst.get('/likedposts', (req, res) => {
    LikedPosts.findAll()
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 
 lpst.get('/likedposts/:id', (req, res) => {
    LikedPosts.findOne({where : {id : req.params.id}})
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 module.exports = lpst;