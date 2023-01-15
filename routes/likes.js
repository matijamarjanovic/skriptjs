const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const lk = express.Router();
lk.use(express.json());
lk.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const jwt = require('jsonwebtoken');

function getCookies(req){
    if (req.headers.cookie == null) return {};

    const rawCookie = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookie.forEach(el => {
        const tmp = el.split('=');
        parsedCookies[tmp[0]] = tmp[1];
    });

    return parsedCookies;
}
lk.use(authToken);

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];

    if (token === null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
        if (err) return res.redirect(301, '/login');

        req.user = usr;

        next();
    });
}

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
    let empty = true;
    if(req.body.postId === '' ||req.body.userId === '') 
        empty = false;
    
    let goodInt = true;

    if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if (existingPost && existingUser && goodInt)  {
        Likes.create({ userId: req.body.userId, postId: req.body.postId})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(!goodInt) {
        res.status(400).send({message: 'Use exclusively integers for IDs'});
    }else{
        res.status(400).send({message: 'Error creating a like, invalid user or post ID'});
    }
});

lk.put('/likes/:id', async(req, res) => {
  
        const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    let empty = true;
    if(req.body.postId === '' ||req.body.userId === '') 
        empty = false;
    
    let goodInt = true;

    if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if (existingPost && existingUser && goodInt)  {
        Likes.findOne({where : {id : req.params.id}})
        .then( lk => {
               lk.userId = req.body.userId;
               lk.postId = req.body.postId;
               lk.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(!goodInt) {
        res.status(400).send({message: 'Use exclusively integers for IDs'});
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