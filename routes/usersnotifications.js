const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const usrnotif = express.Router();
 
 usrnotif.get('/usersnotifications', (req, res) => {
    UsersNotifications.findAll()
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 
 usrnotif.get('/usersnotifications/:id', (req, res) => {
    UsersNotifications.findOne({where : {id : req.params.id}})
         .then(rows => res.json(wors))
         .catch(err => res.status(500).json(err));
 });
 
 module.exports = usrnotif;