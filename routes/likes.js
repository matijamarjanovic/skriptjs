const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const lk = express.Router();
lk.use(express.json());
lk.use(express.urlencoded({ extended: true }));

lk.get('/likes', (req, res) => {
    Likes.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


lk.get('/likes/:id', (req, res) => {
    Likes.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

lk.post('/likes/', async(req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    const empty = true;
    if(req.body.postId === '' ||req.body.userId === '') 
        empty = false;

    if (existingPost && existingUser) {
        Likes.create({ userId: req.body.userId, postId: req.body.postId })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else{
        res.status(400).send({message: 'Error creating a like, invalid user or post ID'});
    }
    
});

lk.put('/likes/:id', async(req, res) => {

    
    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    const empty = true;
    if(req.body.postId === '' ||req.body.userId === '') 
        empty = false;

    if (existingPost && existingUser) {
        Likes.findOne({where : {id : req.params.id}})
        .then( lk => {
               lk.userId = req.body.userId;
               lk.postId = req.body.postId;
               lk.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else{
        res.status(400).send({message: 'Error creating a like, invalid user or post ID'});
    }
    
    
});

lk.delete('/likes/:id', (req, res) => {
    Likes.findOne({where : {id : req.params.id}})
    .then( lk => {
        lk.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = lk;