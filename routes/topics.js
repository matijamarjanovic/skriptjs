const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const tp = express.Router();
tp.use(express.json());
tp.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const jwt = require('jsonwebtoken');
const joi = require('joi');

const validation = joi.object({
    name: joi.string().required(),
    userId: joi.number().integer().required(),
    description: joi.string().required()
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

//tp.use(authToken);
tp.get('/topics', (req, res) => {
    Topics.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});


tp.get('/topics/:id', (req, res) => {
    Topics.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});

tp.post('/topics/', async(req, res) => {        

            const payload = {
                name : req.body.name,
                userId: req.body.userId,
                description: req.body.description
            };
            const {err} = validation.validate(payload);
        
            if (err)  {
                res.status(400).send({message : 'Invalid data'})
            }else{
                Topics.create({ userId: req.body.userId, name: req.body.name, description: req.body.description })
                .then(rows => res.json(rows))
                .catch(err => res.status(500).send({message : 'Server internal error'}));    
    
            }
        
    
});

tp.put('/topics/:id', async(req, res) => {

    const payload = {
        name : req.body.name,
        userId: req.body.userId,
        description: req.body.description
    };
    const {err} = validation.validate(payload);

    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else {
        Topics.findOne({where : {id : req.params.id}})
        .then( tp => {
            tp.userId = req.body.userId;
            tp.name = req.body.name;
            tp.description = req.body.description;
            tp.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));

    }
  
});

tp.delete('/topics/:id', (req, res) => {
    Topics.findOne({where : {id : req.params.id}})
    .then( tp => {
        tp.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Server internal error'}));;
});

module.exports = tp;