const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
const express = require('express');
const pst = express.Router();
pst.use(express.json());
pst.use(express.urlencoded({ extended: true }));

 pst.get('/posts', (req, res) => {
    Posts.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


pst.get('/posts/:id', (req, res) => {
    Posts.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


module.exports = pst;