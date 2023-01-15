const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const tp = express.Router();
tp.use(express.json());
tp.use(express.urlencoded({ extended: true }));

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

tp.use(authToken);

tp.get('/topics', (req, res) => {
    Topics.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


tp.get('/topics/:id', (req, res) => {
    Topics.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

tp.post('/topics/', async(req, res) => {        
   
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    let empty = true;
    if(req.body.name === '' ||req.body.userId === '' || req.body.description === '') 
        empty = false;
    let goodInt = true;

     if (!Number.isInteger(req.body.userId))
        goodInt = false;
    if (goodInt) {
        Topics.create({ userId: req.body.userId, name: req.body.name, description: req.body.description })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));    
    }else{
        res.status(400).send({message: 'Use integers for IDs'});
      }
    
});

tp.put('/topics/:id', async(req, res) => {

    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    let empty = true;
    if(req.body.name === '' ||req.body.userId === '' || req.body.description === '') 
        empty = false;
    let goodInt = true;

     if (!Number.isInteger(req.body.userId))
        goodInt = false;
    if (goodInt) {
        Topics.findOne({where : {id : req.params.id}})
        .then( tp => {
               tp.userId = req.body.userId;
               tp.name = req.body.name;
               tp.description = req.body.description;
               tp.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));    }
    else{
        res.status(400).send({message: 'Use integers for IDs'});
      }
     
});

tp.delete('/topics/:id', (req, res) => {
    Topics.findOne({where : {id : req.params.id}})
    .then( tp => {
        tp.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = tp;