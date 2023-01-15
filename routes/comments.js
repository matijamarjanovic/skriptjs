const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const cmt = express.Router();
 cmt.use(express.json());
 cmt.use(express.urlencoded({ extended: true }));
 
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
 
 cmt.post('/comments/', async (req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    let empty = true;
    let ponovljenkomentar = false;

    if(req.body.postId === '' ||req.body.userId === '' || req.body.content === '') 
        empty = false;

    if (existingPost && existingUser) {
        ponovljenkomentar = true;
    }else{
        res.status(400).send({message: 'Error creating a comment, invalid user or post ID'});
    }
    Comments.create({ postId: req.body.postId, userId: req.body.userId, content: req.body.content})
         .then(rows => res.json(rows))
         .catch(err => res.status(500).json(err));
 });
 
 cmt.put('/comments/:id', async (req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    const ponovljenkomentar = false;
    let empty = true;
    if(req.body.postId === '' ||req.body.userId === '' || req.body.content === '') 
        empty = false;

    if (existingPost && existingUser) {
        ponovljenkomentar = true;
    }else{
        res.status(400).send({message: 'Error creating a comment, invalid user or post ID'});
    }

    Comments.findOne({where : {id : req.params.id}})
        .then( cmt => {
            cmt.postId = req.body.postId;
            cmt.userId = req.body.userId;
            cmt.content = req.body.content;

            cmt.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
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