const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   ppstications, Usersppstications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const ppst = express.Router();
ppst.use(express.json());
ppst.use(express.urlencoded({ extended: true }));

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

ppst.use(authToken);

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
    let empty = true;
    if(req.body.postId === '' ||req.body.userId === '') 
        empty = false;
    
    let goodInt = true;

    if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if (existingPost && existingUser && goodInt)  {
        PinnedPosts.create({ userId: req.body.userId, postId: req.body.postId})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(!goodInt) {
        res.status(400).send({message: 'Use exclusively integers for IDs'});
    }else{
        res.status(400).send({message: 'Error creating a pinned post, invalid user or post ID'});
    }
    
});

ppst.put('/pinnedposts/:id', async(req, res) => {

    const existingPost = await Posts.findOne({where : {id : req.body.postId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    let empty = true;
    if(req.body.postId === '' ||req.body.userId === '') 
        empty = false;
    
    let goodInt = true;

    if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if (existingPost && existingUser && goodInt)  {
        PinnedPosts.findOne({where : {id : req.params.id}})
        .then( ppst => {
               ppst.userId = req.body.userId;
               ppst.postId = req.body.postId;
               ppst.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(!goodInt) {
        res.status(400).send({message: 'Use exclusively integers for IDs'});
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