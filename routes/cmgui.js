const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const cmt = express.Router();
 cmt.use(express.json());
 cmt.use(express.urlencoded({ extended: true }));

cmt.get('/comments', (req, res) =>{
    Comments.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Error'}));
});

 module.exports = cmt;