const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 
    const express = require('express');
    const intrst= express.Router();
    intrst.use(express.json());
    intrst.use(express.urlencoded({ extended: true }));

    require('dotenv').config();
const jwt = require('jsonwebtoken');

const joi = require('joi');

const validation = joi.object({
    topicId: joi.number().integer().required(),
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

//intrst.use(authToken);
    
  
    intrst.get('/interests', (req, res) => {
       Interests.findAll()
            .then(rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
    });
    
    
    intrst.get('/interests/:id', (req, res) => {
       Interests.findOne({where : {id : req.params.id}})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
    });
    
    intrst.post('/interests/', async(req, res) => {

    const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    
    const payload = {
        topicId : req.body.topicId,
        userId: req.body.userId,
        content: req.body.content
    };
    const {err} = validation.validate(payload);

    if (err) {
        res.status(400).send({message : 'Invalid data'})
    }else{
        if (existingTopic && existingUser) {
            Interests.create({ userId: req.body.userId, topicId: req.body.topicId})
                .then(rows => res.json(rows))
                .catch(err => res.status(500).send({message : 'Server internal error'}));
        }else{
            res.status(400).send({message: 'Error creating an interest, invalid user or topic ID'});
        }
    }
    
       
    });
    
    intrst.put('/interests/:id', async(req, res) => {

        
    const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    
    const payload = {
        topicId : req.body.topicId,
        userId: req.body.userId,
        content: req.body.content
    };
    const {err} = validation.validate(payload);

    if (err) {
        res.status(400).send({message : 'Invalid data'})
    }else{
        if (existingTopic && existingUser) {
            Interests.findOne({where : {id : req.params.id}})
            .then( intrst=> {
                intrst.userId = req.body.userId;
                intrst.topicId = req.body.topicId;
    
                intrst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
        }else{
            res.status(400).send({message: 'Error creating an interest, invalid user or topic ID'});
        }
    }
    
   
    });
    
    intrst.delete('/interests/:id', (req, res) => {
       Interests.findOne({where : {id : req.params.id}})
        .then( intrst=> {
            intrst.destroy();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));;
    });
    
    module.exports = intrst;