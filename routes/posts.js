const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 

    const express = require('express');
    const pst= express.Router();
    pst.use(express.json());
    pst.use(express.urlencoded({ extended: true }));
    
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
    
    pst.post('/posts/', (req, res) => {
       Posts.create({ userId: req.body.userId, topicId: req.body.topicId, title: req.body.title, content: req.body.content})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    });
    
    pst.put('/posts/:id', (req, res) => {
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