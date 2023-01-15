const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
const joi = require('joi');

    const validation = joi.object({
        topicId: joi.number().integer().required(),
        userId: joi.number().integer().required(),
        title: joi.string().min(2).required(),
        content: joi.string().required()
    .default([]),
       is_active: joi.boolean().default(true),
    });

    const express = require('express');
    const pst= express.Router();
    pst.use(express.json());
    pst.use(express.urlencoded({ extended: true }));

    require('dotenv').config();
    const jwt = require('jsonwebtoken');

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
    //pst.use(authToken);

        pst.get('/posts', (req, res) => {
        Posts.findAll()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).send({message : 'Server internal error'}));
        });
        
        
        pst.get('/posts/:id', (req, res) => {
        Posts.findOne({where : {id : req.params.id}})
                .then(rows => res.json(rows))
                .catch(err => res.status(500).send({message : 'Server internal error'}));
        });
        
        pst.post('/posts/', async(req, res) => {

            const payload = {   
                topicId : req.body.topicId,
                userId : req.body.userId,
                title : req.body.title,
                content : req.body.content
            };

            const { error } = validation.validate(payload);

            if (error) {
                res.status(400).send({message: 'Enter valid data'});
            }else{
                Posts.create({ userId: req.body.userId, topicId: req.body.topicId, title: req.body.title, content: req.body.content})
                .then(rows => res.json(rows))
                .catch(err => res.status(500).send({message : 'Server internal error'}));
            }
            
        
        });
    
    pst.put('/posts/:id', async(req, res) => {

        const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
        const existingUser = await Users.findOne({where : {id : req.body.userId}});
        const empty = true;

        if(req.body.userId === '' ||req.body.topicId === '' || req.body.title === '' || req.body.content === '')  
            empty = false;

        let goodInt = true;

        if (!isPositiveInteger(req.body.topicId) || !isPositiveInteger(req.body.userId))
            goodInt = false;
        
        if (goodInt){
            Posts.findOne({where : {id : req.params.id}})
            .then( pst=> {
                pst.userId = req.body.userId;
                pst.topicId = req.body.topicId;
                pst.title = req.body.title;
                pst.content = req.body.content;
     
                pst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
        }else if (!goodInt){
            res.status(400).send({message: 'Use integers for IDs'});
        }
        
           
       
    });
    
    pst.delete('/posts/:id', (req, res) => {
       Posts.findOne({where : {id : req.params.id}})
        .then( pst=> {
            pst.destroy();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));;
    });
    
    module.exports = pst;