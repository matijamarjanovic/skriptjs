const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 

    const express = require('express');
    const pst= express.Router();
    pst.use(express.json());
    pst.use(express.urlencoded({ extended: true }));

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
    pst.use(authToken);

        pst.get('/posts', (req, res) => {
        Posts.findAll()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        });
        
        
        pst.get('/posts/:id', (req, res) => {
        Posts.findOne({where : {id : req.params.id}})
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        });
        
        pst.post('/posts/', async(req, res) => {

            
            const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
            const existingUser = await Users.findOne({where : {id : req.body.userId}});
            const empty = true;

            if(req.body.userId === '' ||req.body.topicId === '' || req.body.title === '' || req.body.content === '')  
                empty = false;

            let goodInt = true;

            if (!Number.isInteger(req.body.topicId) || !Number.isInteger(req.body.userId))
                goodInt = false;
            
            if (goodInt){
                Posts.create({ userId: req.body.userId, topicId: req.body.topicId, title: req.body.title, content: req.body.content})
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
            }else if (!goodInt){
                res.status(400).send({message: 'Use integers for IDs'});
            }
            
        
        });
    
    pst.put('/posts/:id', async(req, res) => {

        const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
        const existingUser = await Users.findOne({where : {id : req.body.userId}});
        const empty = true;

        if(req.body.userId === '' ||req.body.topicId === '' || req.body.title === '' || req.body.content === '')  
            empty = false;

        let goodInt = true;

        if (!Number.isInteger(req.body.topicId) || !Number.isInteger(req.body.userId))
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
            .catch(err => res.status(500).json(err));
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
        .catch(err => res.status(500).json(err));;
    });
    
    module.exports = pst;