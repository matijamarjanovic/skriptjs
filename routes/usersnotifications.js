const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const usrsnotif = express.Router();
usrsnotif.use(express.json());
usrsnotif.use(express.urlencoded({ extended: true }));

usrsnotif.get('/usersnotifications', (req, res) => {
    UsersNotifications.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


usrsnotif.get('/usersnotifications/:id', (req, res) => {
    UsersNotifications.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

usrsnotif.post('/usersnotifications/', async(req, res) => {
    const existingNotification = await Notifications.findOne({where : {id : req.body.notificationId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    const empty = true;
    
    if(req.body.notificationId === '' ||req.body.userId === '')
    empty = false;
    let goodInt = true;

    if (!Number.isInteger(req.body.notificationId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if (existingNotification && existingUser&& goodInt) {
        UsersNotifications.create({ userId: req.body.userId, notificationId: req.body.notificationId })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

    }else if(!goodInt){
        res.status(400).send({message: 'Use integers for IDs'});
    }else{
        res.status(400).send({message: 'Error creating a usernotification, invalid user or notification ID'});
    }
});

usrsnotif.put('/usersnotifications/:id', async(req, res) => {


    const existingNotification = await Notifications.findOne({where : {id : req.body.notificationId}});
    const existingUser = await Users.findOne({where : {id : req.body.userId}});
    const empty = true;
    
    if(req.body.notificationId === '' ||req.body.userId === '')
    empty = false;
    let goodInt = true;

    if (!Number.isInteger(req.body.notificationId) || !Number.isInteger(req.body.userId))
        goodInt = false;

    if (existingNotification && existingUser&& goodInt) {
        UsersNotifications.findOne({where : {id : req.params.id}})
        .then( usrsnotif => {
               usrsnotif.userId = req.body.userId;
               usrsnotif.notificationId = req.body.notificationId;

               usrsnotif.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }else if(!goodInt){
        res.status(400).send({message: 'Use integers for IDs'});
    }else{
        res.status(400).send({message: 'Error creating a usernotification, invalid user or notification ID'});
    }
    
});

usrsnotif.delete('/usersnotifications/:id', (req, res) => {
    UsersNotifications.findOne({where : {id : req.params.id}})
    .then( usrsnotif => {
        usrsnotif.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = usrsnotif;