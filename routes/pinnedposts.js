const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   ppstications, Usersppstications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const ppst = express.Router();
ppst.use(express.json());
ppst.use(express.urlencoded({ extended: true }));

ppst.get('/pinnedposts', (req, res) => {
    PinnedPosts.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


ppst.get('/pinnedposts/:id', (req, res) => {
    PinnedPosts.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

ppst.post('/pinnedposts/', async(req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    const empty = true;
    if(req.body.postId === '' ||req.body.userId === '') 
        empty = false;

    if (existingPost && existingUser && !empty){
        PinnedPosts.create({ userId: req.body.userId, postId: req.body.postId })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(empty) {
        res.status(400).send({message: 'Please fill all the fields!'});
    }else{
        res.status(400).send({message: 'Error creating a pinned post, invalid user or post ID'});
    }
    
});

ppst.put('/pinnedposts/:id', async(req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    const empty = true;
    if(req.body.postId === '' ||req.body.userId === '') 
        empty = false;

    if (existingPost && existingUser && !empty){
        PinnedPosts.findOne({where : {id : req.params.id}})
        .then( ppst => {
               ppst.userId = req.body.userId;
               ppst.postId = req.body.postId;
               ppst.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(empty) {
        res.status(400).send({message: 'Please fill all the fields!'});
    }else{
        res.status(400).send({message: 'Error creating a pinned post, invalid user or post ID'});
    }

    
});

ppst.delete('/pinnedposts/:id', (req, res) => {
    PinnedPosts.findOne({where : {id : req.params.id}})
    .then( ppst => {
        ppst.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = ppst;