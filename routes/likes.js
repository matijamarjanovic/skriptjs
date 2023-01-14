const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const lk = express.Router();
 
 lk.get('/likes', (req, res) => {
    Likes.findAll()
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 
 lk.get('/likes/:id', (req, res) => {
    Likes.findOne({where : {id : req.params.id}})
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 module.exports = lk;