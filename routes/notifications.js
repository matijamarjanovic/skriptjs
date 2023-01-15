const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const notif = express.Router();
notif.use(express.json());
notif.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const jwt = require('jsonwebtoken');
const joi = require('joi');

const validation = joi.object({
    postId: joi.number().integer().required(),
    notifType: joi.string().required(),
    content: joi.string().required()
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
//notif.use(authToken);

function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
    const num = Number(str);

    if (isPositiveInteger(num) && num > 0) {
      return true;
    }
    return false;
  }
  
notif.get('/notifications', (req, res) => {
    Notifications.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});


notif.get('/notifications/:id', (req, res) => {
    Notifications.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});

notif.post('/notifications/', async(req, res) => {

    const payload = {
        postId : req.body.postId,
        userId: req.body.userId,
        content: req.body.content
    };
    const {err} = validation.validate(payload);
    let goodNotif = false;

    if ((req.body.content === 'Your post has a new comment.' && req.body.notifType === 'comment') ||
    (req.body.content === 'Your post has a new like.' && req.body.notifType === 'like'))
            goodNotif = true;
    if (err)  {
        res.status(400).send({message : 'Invalid data'})
    }else{
        if (goodNotif){
            Notifications.create({ postId: req.body.postId, notifType: req.body.notifType,  content: req.body.content })
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).send({message : 'Server internal error'}));
        }else{
            res.status(400).send({message: 'Error creating a notification, invalid post ID or notification is not written correctly.'});
        }
        
    }

});

notif.put('/notifications/:id', async(req, res) => {

        const payload = {
            postId : req.body.postId,
            userId: req.body.userId,
            content: req.body.content
        };
        const {err} = validation.validate(payload);
        let goodNotif = false;
    
        if ((req.body.content === 'Your post has a new comment.' && req.body.notifType === 'comment') ||
        (req.body.content === 'Your post has a new like.' && req.body.notifType === 'like'))
                goodNotif = true;
        if (err)  {
            res.status(400).send({message : 'Invalid data'})
        }else{
            if (goodNotif){
                Notifications.findOne({where : {id : req.params.id}})
                .then( notif => {
                        notif.notifType = req.body.notifType;;
                        notif.postId = req.body.postId;
                        notif.content = req.body.content;
        
                       notif.save();
                })
                .then( rows => res.json(rows))
                .catch(err => res.status(500).send({message : 'Server internal error'}));
            }else{
                res.status(400).send({message: 'Notification is not written correctly.'});
            }
            
        }

});

notif.delete('/notifications/:id', (req, res) => {
    Notifications.findOne({where : {id : req.params.id}})
    .then( notif => {
        notif.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).send({message : 'Server internal error'}));;
});

module.exports = notif;