const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const lk = express.Router();
lk.use(express.json());
lk.use(express.urlencoded({ extended: true }));

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

//lk.use(authToken);

lk.get('/likes', (req, res) => {
    Likes.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});

lk.get('/likes/:id', (req, res) => {
    Likes.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});

lk.post('/likes/', async(req, res) => {

   
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
            Likes.create({ userId: req.body.userId, postId: req.body.postId})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
        }else{
            res.status(400).send({message: 'Error creating a like, invalid user or post ID'});
        }
    }

});

lk.put('/likes/:id', async(req, res) => {
  
    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});

    const payload = {
        postId : req.body.postId,
        userId: req.body.userId
    };
    const {err} = validation.validate(payload);

    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else {
        if (existingPost && existingUser)  {
            Likes.findOne({where : {id : req.params.id}})
            .then( lpst=> {
                lpst.userId = req.body.userId;
                lpst.postId = req.body.postId;
    
                lpst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
        }else{
            res.status(400).send({message: 'Error updating a like, invalid user or post ID'});
        }
    }
    
});

lk.delete('/likes/:id', (req, res) => {
    Likes.findOne({where : {id : req.params.id}})
    .then( lk => {
        lk.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Server internal error'}));;
});

module.exports = lk;