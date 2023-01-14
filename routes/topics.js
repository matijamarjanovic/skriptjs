const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const tp = express.Router();
tp.use(express.json());
tp.use(express.urlencoded({ extended: true }));

tp.get('/topics', (req, res) => {
    Topics.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


tp.get('/topics/:id', (req, res) => {
    Topics.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

tp.post('/topics/', (req, res) => {
    Topics.create({ userId: req.body.userId, name: req.body.name, description: req.body.description })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

tp.put('/topics/:id', (req, res) => {
    Topics.findOne({where : {id : req.params.id}})
        .then( tp => {
               tp.userId = req.body.userId;
               tp.name = req.body.name;
               tp.description = req.body.description;
               tp.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

tp.delete('/topics/:id', (req, res) => {
    Topics.findOne({where : {id : req.params.id}})
    .then( tp => {
        tp.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = tp;