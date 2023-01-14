const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
 
    const express = require('express');
    const intrst= express.Router();
    intrst.use(express.json());
    intrst.use(express.urlencoded({ extended: true }));
    
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
    
    intrst.post('/interests/', (req, res) => {
       Interests.create({ userId: req.body.userId, topicId: req.body.topicId})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    });
    
    intrst.put('/interests/:id', (req, res) => {
       Interests.findOne({where : {id : req.params.id}})
            .then( intrst=> {
                intrst.userId = req.body.userId;
                intrst.topicId = req.body.topicId;
    
                intrst.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).json(err));
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