const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 

    const express = require('express');
    const lpst= express.Router();
    lpst.use(express.json());
    lpst.use(express.urlencoded({ extended: true }));
    
    lpst.get('/likedposts', (req, res) => {
       LikedPosts.findAll()
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    });
    
    
    lpst.get('/likedposts/:id', (req, res) => {
       LikedPosts.findOne({where : {id : req.params.id}})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    });
    
    lpst.post('/likedposts/', (req, res) => {
       LikedPosts.create({ userId: req.body.userId, postId: req.body.postId})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    });
    
    lpst.put('/likedposts/:id', (req, res) => {
       LikedPosts.findOne({where : {id : req.params.id}})
            .then( lpst=> {
                lpst.userId = req.body.userId;
                lpst.postId = req.body.postId;
    
                lpst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    });
    
    lpst.delete('/likedposts/:id', (req, res) => {
       LikedPosts.findOne({where : {id : req.params.id}})
        .then( lpst=> {
            lpst.destroy();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));;
    });
    
    module.exports = lpst;