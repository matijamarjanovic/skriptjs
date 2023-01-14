const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   ppstications, Usersppstications, PinnedPosts, LikedPosts } = require('../models');

const express = require('express');
const ppst = express.Router();
ppst.use(express.json());
ppst.use(express.urlencoded({ extended: true }));

ppst.get('/pinnedposts', (req, res) => {
    PinnedPosts.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});


ppst.get('/pinnedposts/:id', (req, res) => {
    PinnedPosts.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

ppst.post('/pinnedposts/', (req, res) => {
    PinnedPosts.create({ userId: req.body.userId, postId: req.body.postId })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

ppst.put('/pinnedposts/:id', (req, res) => {
    PinnedPosts.findOne({where : {id : req.params.id}})
        .then( ppst => {
               ppst.userId = req.body.userId;
               ppst.postId = req.body.postId;
               ppst.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

ppst.delete('/pinnedposts/:id', (req, res) => {
    PinnedPosts.findOne({where : {id : req.params.id}})
    .then( ppst => {
        ppst.destroy();
    })
    .then( rows => res.json(rows))
    .catch(err => res.status(500).json(err));;
});

module.exports = ppst;