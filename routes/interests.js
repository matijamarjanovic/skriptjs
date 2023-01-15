const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 
    const express = require('express');
    const intrst= express.Router();
    intrst.use(express.json());
    intrst.use(express.urlencoded({ extended: true }));

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

intrst.use(authToken);
    
    intrst.get('/interests', (req, res) => {
       Interests.findAll()
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    });
    
    
    intrst.get('/interests/:id', (req, res) => {
       Interests.findOne({where : {id : req.params.id}})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    });
    
    intrst.post('/interests/', async(req, res) => {

    const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    
    let empty = true;
    if(req.body.topicId === '' ||req.body.userId === '') 
        empty = false;

    let goodInt = true;

    if (!Number.isInteger(req.body.postId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if (existingTopic && existingUser && goodInt) {
        Interests.create({ userId: req.body.userId, topicId: req.body.topicId})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    }else if(!goodInt) {
        res.status(400).send({message: 'Use exclusively integers for IDs'});
    }else{
        res.status(400).send({message: 'Error creating an interest, invalid user or topic ID'});
    }
       
    });
    
    intrst.put('/interests/:id', async(req, res) => {

        const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
        const existingUser = await Users.findOne({where : {id : req.body.userId}});
        
        let empty = true;
        if(req.body.topicId === '' ||req.body.userId === '') 
            empty = false;
    
        let goodInt = true;
    
        if (!Number.isInteger(req.body.topicId) || !Number.isInteger(req.body.userId))
            goodInt = false;
    
        if (existingTopic && existingUser && goodInt) {
            Interests.findOne({where : {id : req.params.id}})
            .then( intrst=> {
                intrst.userId = req.body.userId;
                intrst.topicId = req.body.topicId;
    
                intrst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).json(err));
        }else if(!goodInt) {
            res.status(400).send({message: 'Use exclusively integers for IDs'});
        }else{
            res.status(400).send({message: 'Error updating an interest, invalid user or topic ID'});
        }
    });
    
    intrst.delete('/interests/:id', (req, res) => {
       Interests.findOne({where : {id : req.params.id}})
        .then( intrst=> {
            intrst.destroy();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));;
    });
    
    module.exports = intrst;