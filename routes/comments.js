const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 const express = require('express');
 const { INTEGER } = require('sequelize');
 const cmt = express.Router();
 cmt.use(express.json());
 cmt.use(express.urlencoded({ extended: true }));

 require('dotenv').config();
 const jwt = require('jsonwebtoken');

 const joi = require('joi');

    const validation = joi.object({
        postId: joi.number().integer().required(),
        userId: joi.number().integer().required(),
        content: joi.string().required()
    .default([]),
       is_active: joi.boolean().default(true),
    });

 function authToken(req, res, next) {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.status(401).json({message : 'Error'});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
        if (err) return res.status(403).send({message : 'Access Denied'});

        req.user = usr;

        next();
    });
 }

 //cmt.use(authToken);
 
 cmt.get('/comments', (req, res) => {
    Comments.findAll()
         .then(rows => res.json(rows))
         .catch(err => res.status(500).send({message : 'Error'}));
 });
 
 
 cmt.get('/comments/:id', (req, res) => {
    Comments.findOne({where : {id : req.params.id}})
         .then(rows => res.json(rows))
         .catch(err => res.status(500).send({message : 'Error'}));
 });
 

 cmt.post('/comments/', authToken, async (req, res) => {

    const payload = {
        postId : req.body.postId,
        userId: req.body.userId,
        content: req.body.content
    };
    const {err} = validation.validate(payload);

    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else if (!goodInt){
        Comments.create({ postId: req.body.postId, userId: req.body.userId, content: req.body.content})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
    }
    
 });
 
 cmt.put('/comments/:id', async (req, res) => {

    const payload = {
        postId : req.body.postId,
        userId: req.body.userId,
        content: req.body.content
    };
    const {err} = validation.validate(payload);

    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else if (!goodInt){
        Comments.findOne({where : {id : req.params.id}})
        .then( cmt => {
            cmt.postId = req.body.postId;
            cmt.userId = req.body.userId;
            cmt.content = req.body.content;

            cmt.save();
        })
        .then( rows => res.json(rows))
        .catch(() => res.status(500).send({message : 'Server internal error'}));
    }

   
 });
 
 cmt.delete('/comments/:id', (req, res) => {
    Comments.findOne({where : {id : req.params.id}})
     .then( cmt => {
         cmt.destroy();
     })
     .then( rows => res.json(rows))
     .catch(() => res.status(500).send({message : 'Server internal error'}));
 });
 
 module.exports = cmt;