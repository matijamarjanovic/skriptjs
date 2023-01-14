const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const tpc = express.Router();
 
 tpc.get('/topics', (req, res) => {
    Topics.findAll()
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 
 tpc.get('/topics/:id', (req, res) => {
    Topics.findOne({where : {id : req.params.id}})
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 module.exports = tpc;