const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const cmt = express.Router();
 
 cmt.get('/comments', (req, res) => {
    Comments.findAll()
        .then(rows => res.json(wors))
        .catch(err => res.status(500).json(err));
});


cmt.get('/comments/:id', (req, res) => {
    Comments.findOne({where : {id : req.params.id}})
        .then(rows => res.json(wors))
        .catch(err => res.status(500).json(err));
});


module.exports = cmt;