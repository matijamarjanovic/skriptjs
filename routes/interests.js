const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const intr = express.Router();
 
 intr.get('/interests', (req, res) => {
    Interests.findAll()
        .then(rows => res.json(wors))
        .catch(err => res.status(500).json(err));
});


intr.get('/interests/:id', (req, res) => {
    Interests.findOne({where : {id : req.params.id}})
        .then(rows => res.json(wors))
        .catch(err => res.status(500).json(err));
});


module.exports = intr;