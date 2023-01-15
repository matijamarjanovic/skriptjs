const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const usrsnotif = express.Router();
usrsnotif.use(express.json());
usrsnotif.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const jwt = require('jsonwebtoken');

const joi = require('joi');

const validation = joi.object({
    notificationId: joi.number().integer().required(),
    userId: joi.number().integer().required()
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
//usrsnotif.use(authToken);
  
usrsnotif.get('/usersnotifications', (req, res) => {
    UsersNotifications.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});


usrsnotif.get('/usersnotifications/:id', (req, res) => {
    UsersNotifications.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});

usrsnotif.post('/usersnotifications/', async(req, res) => {
    const existingNotification = await Notifications.findOne({where : {id : req.body.notificationId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});

    const payload = {
        postId : req.body.postId,
        userId: req.body.userId,
        content: req.body.content
    };
    const {err} = validation.validate(payload);

    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else{
        if (existingNotification || existingUser) {
            UsersNotifications.create({ userId: req.body.userId, notificationId: req.body.notificationId })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
    
        }else{
            res.status(400).send({message: 'Error creating a usernotification, invalid user or notification ID, or it already exists'});
        }
    }

});

usrsnotif.put('/usersnotifications/:id', async(req, res) => {

    const existingNotification = await Notifications.findOne({where : {id : req.body.notificationId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    const empty = true;

    const payload = {
        postId : req.body.postId,
        userId: req.body.userId,
        content: req.body.content
    };
    const {err} = validation.validate(payload);

    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else{
        if (existingNotification && existingUser) {
            UsersNotifications.findOne({where : {id : req.params.id}})
            .then( usrsnotif => {
                   usrsnotif.userId = req.body.userId;
                   usrsnotif.notificationId = req.body.notificationId;
    
                   usrsnotif.save();
            })
            .then( rows => res.json(rows))
            .catch(err => res.status(500).send({message : 'Server internal error'}));
    
        }else{
            res.status(400).send({message: 'Error creating a usernotification, invalid user or notification ID'});
        }
    }
    
});

usrsnotif.delete('/usersnotifications/:id', (req, res) => {
    UsersNotifications.findOne({where : {id : req.params.id}})
    .then( usrsnotif => {
        usrsnotif.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Server internal error'}));;
});

module.exports = usrsnotif;