const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   ppstications, Usersppstications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const ppst = express.Router();
ppst.use(express.json());
ppst.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const jwt = require('jsonwebtoken');

const joi = require('joi');

const validation = joi.object({
    postId: joi.number().integer().required(),
    userId: joi.number().integer().required()
.default([]),
   is_active: joi.boolean().default(true),
});

function authToken(req, res, next) {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.status(401).json({message : 'Error'});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
        if (err) return res.status(403).json({message : 'Access Denied'});

        req.user = usr;

        next();
    });
}

//ppst.use(authToken);

ppst.get('/pinnedposts/:id', (req, res) => {
    PinnedPosts.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});

ppst.get('/pinnedposts/', (req, res) => {
    PinnedPosts.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});

ppst.post('/pinnedposts/', async(req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});

    const payload = {
        postId : req.body.postId,
        userId: req.body.userId
    };
    const {err} = validation.validate(payload);

    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else{
        if (existingPost && existingUser)  {
            PinnedPosts.create({ userId: req.body.userId, postId: req.body.postId})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
        }else{
            res.status(400).send({message: 'Error creating a pinned post, invalid user or post ID'});
        }
    }

    
});

ppst.put('/pinnedposts/:id', async(req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});

    const payload = {
        postId : req.body.postId,
        userId: req.body.userId
    };
    const {err} = validation.validate(payload);

    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else{
        if (existingPost && existingUser)  {
            PinnedPosts.findOne({where : {id : req.params.id}})
            .then( lpst=> {
                lpst.userId = req.body.userId;
                lpst.postId = req.body.postId;
    
                lpst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
        }else{
            res.status(400).send({message: 'Error updating a pinned post, invalid user or post ID'});
        }
    }
});

ppst.delete('/pinnedposts/:id', (req, res) => {
    PinnedPosts.findOne({where : {id : req.params.id}})
    .then( ppst => {
        ppst.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Server internal error'}));;
});

module.exports = ppst;