const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
const { INTEGER } = require('sequelize');
 const cmt = express.Router();
 cmt.use(express.json());
 cmt.use(express.urlencoded({ extended: true }));

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

 cmt.use(authToken);
 
 cmt.get('/comments', (req, res) => {
    Comments.findAll()
         .then(rows => res.json(rows))
         .catch(err => res.status(500).json(err));
 });
 
 
 cmt.get('/comments/:id', (req, res) => {
    Comments.findOne({where : {id : req.params.id}})
         .then(rows => res.json(rows))
         .catch(err => res.status(500).json(err));
 });
 

 cmt.post('/comments/', authToken, async (req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    let empty = true;
    let goodInt = true;

    if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if(req.body.postId === '' ||req.body.userId === '' || req.body.content === '') 
        empty = false;

    if (goodInt)  {
        Comments.create({ postId: req.body.postId, userId: req.body.userId, content: req.body.content})
         .then(rows => res.json(rows))
         .catch(err => res.status(500).json(err));
    }else if (!goodInt){
        res.status(400).send({message: 'Use exclusively integers for IDs'});
    }
    
 });
 
 cmt.put('/comments/:id', async (req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    let empty = true;
    let goodInt = true;

    if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if(req.body.postId === '' ||req.body.userId === '' || req.body.content === '') 
        empty = false;

    if (goodInt)  {
        Comments.findOne({where : {id : req.params.id}})
        .then( cmt => {
            cmt.postId = req.body.postId;
            cmt.userId = req.body.userId;
            cmt.content = req.body.content;

            cmt.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if (!goodInt){
        res.status(400).send({message: 'Use integers for IDs'});
    }

   
 });
 
 cmt.delete('/comments/:id', (req, res) => {
    Comments.findOne({where : {id : req.params.id}})
     .then( cmt => {
         cmt.destroy();
     })
     .then( rows => res.json(rows))
     .catch(err => res.status(500).json(err));;
 });
 
 module.exports = cmt;