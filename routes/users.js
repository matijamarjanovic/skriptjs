const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const usr = express.Router();
usr.use(express.json());
usr.use(express.urlencoded({ extended: true }));

usr.get('/users', (req, res) => {
    Users.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


usr.get('/users/:id', (req, res) => {
    Users.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

usr.post('/users/', (req, res) => {
    Users.create({ name: req.body.name, email: req.body.email, password: req.body.password})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

usr.put('/users/:id', (req, res) => {
    Users.findOne({where : {id : req.params.id}})
        .then( usr => {
            usr.name = req.body.name;
            usr.email = req.body.email;
            usr.password = req.body.password;

            usr.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

usr.delete('/users/:id', (req, res) => {
    Users.findOne({where : {id : req.params.id}})
    .then( usr => {
        usr.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = usr;