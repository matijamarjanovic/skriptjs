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
    
    lpst.post('/likedposts/', async(req, res) => {

        const existingPost = await Posts.findOne({where : {id : req.body.postId}});
        const existingUser = await Users.findOne({where : {id : req.body.userId}});
        const empty = true;
        if(req.body.postId === '' ||req.body.userId === '') 
            empty = false;

        if (existingPost && existingUser && !empty) {
            LikedPosts.create({ userId: req.body.userId, postId: req.body.postId})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
        }else if(empty) {
            res.status(400).send({message: 'Please fill all the fields!'});
        }else{
            res.status(400).send({message: 'Error creating a liked post, invalid user or post ID'});
        }
       
    });
    
    lpst.put('/likedposts/:id', async(req, res) => {

        const existingPost = await Posts.findOne({where : {id : req.body.postId}});
        const existingUser = await Users.findOne({where : {id : req.body.userId}});
        const empty = true;
        if(req.body.postId === '' ||req.body.userId === '') 
            empty = false;

        if (existingPost && existingUser && !empty) {
            LikedPosts.findOne({where : {id : req.params.id}})
            .then( lpst=> {
                lpst.userId = req.body.userId;
                lpst.postId = req.body.postId;
    
                lpst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).json(err));
        }else if(empty) {
            res.status(400).send({message: 'Please fill all the fields!'});
        }else{
            res.status(400).send({message: 'Error creating a liked post, invalid user or post ID'});
        }

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