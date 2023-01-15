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
    
    pst.post('/posts/', async(req, res) => {

        const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
        const existingUser = await Users.findOne({where : {id : req.body.userId}});
        const empty = true;
        if(req.body.userId === '' ||req.body.topicId === '' || req.body.title === '' || req.body.content === '')  
            empty = false;

        if (existingUser && existingTopic){
            Posts.create({ userId: req.body.userId, topicId: req.body.topicId, title: req.body.title, content: req.body.content})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
        }else{
            res.status(400).send({message: 'Error creating a post, invalid user or topic ID'});
        }
        
       
    });
    
    pst.put('/posts/:id', async(req, res) => {

        const existingTopic = await Topics.findOne({where : {id : req.body.topicId}});
        const existingUser = await Users.findOne({where : {id : req.body.userId}});
        const empty = true;
        if(req.body.userId === '' ||req.body.topicId === '' || req.body.title === '' || req.body.content === '')  
            empty = false;

        if (existingUser && existingTopic){
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
        }else{
            res.status(400).send({message: 'Error creating a post, invalid user or topic ID'});
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