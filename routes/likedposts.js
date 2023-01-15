const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 

    const express = require('express');
    const lpst= express.Router();
    lpst.use(express.json());
    lpst.use(express.urlencoded({ extended: true }));
    
    require('dotenv').config();
    const jwt = require('jsonwebtoken');

    function authToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (token === null) return res.redirect(301, '/login');

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
            if (err) return res.redirect(301, '/login');

            req.user = usr;

            next();
        });
    }

    lpst.use(authToken);
    
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
        let empty = true;
        if(req.body.postId === '' ||req.body.userId === '') 
            empty = false;
        
        let goodInt = true;
    
        if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
            goodInt = false;

        if (existingPost && existingUser && goodInt)  {
            LikedPosts.create({ userId: req.body.userId, postId: req.body.postId})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
        }else if(!goodInt) {
            res.status(400).send({message: 'Use exclusively integers for IDs'});
        }else{
            res.status(400).send({message: 'Error creating a liked post, invalid user or post ID'});
        }
       
    });
    
    lpst.put('/likedposts/:id', async(req, res) => {

        
        const existingPost = await Posts.findOne({where : {id : req.body.postId}});
        const existingUser = await Users.findOne({where : {id : req.body.userId}});
        let empty = true;
        if(req.body.postId === '' ||req.body.userId === '') 
            empty = false;
        
        let goodInt = true;
    
        if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
            goodInt = false;

        if (existingPost && existingUser && goodInt)  {
            LikedPosts.findOne({where : {id : req.params.id}})
            .then( lpst=> {
                lpst.userId = req.body.userId;
                lpst.postId = req.body.postId;
    
                lpst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).json(err));
        }else if(!goodInt) {
            res.status(400).send({message: 'Use exclusively integers for IDs'});
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