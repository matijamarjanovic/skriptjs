const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts, Sequelize } = require('../models');

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

usr.post('/users/', async (req, res) => {
    if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9.a-zA-Z0-9]*$/.test(req.body.email)){
        return res.status(400).send({message: 'Email not valid'});
    }
    if (req.body.password.length < 4 || req.body.password.length > 20){
        return res.status(400).send({message: 'Password has to be between 4 and 20 characters'});
    } 
    const existingUser = await Users.findOne({where : {name : req.body.name}});
    const existingUser2 = await Users.findOne({where : {email : req.body.email}});
    const empty = true;
    if(req.body.name === '' ||req.body.email === '' || req.body.password === '') 
        empty = false;

    if (existingUser && !empty) {
        return res.status(400).send({message: 'User already exists in the database!'});
    }else if(existingUser2){
        return res.status(400).send({message: 'Email already exists in the database!'});
    }else if(empty) {
        res.status(400).send({message: 'Please fill all the fields!'});
    }else{
        Users.create({ name: req.body.name, email: req.body.email, password: req.body.password})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    }
});

usr.put('/users/:id', async (req, res) => {


    if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9.a-zA-Z0-9]*$/.test(req.body.email)){
        return res.status(400).send({message: 'Email not valid'});
    }
    if (req.body.password.length < 4 || req.body.password.length > 20){
        return res.status(400).send({message: 'Password has to be between 4 and 20 characters'});
    } 
    const existingUser = await Users.findOne({where : {name : req.body.name}});
    const existingUser2 = await Users.findOne({where : {email : req.body.email}});
    const empty = true;
    if(req.body.name === '' ||req.body.email === '' || req.body.password === '') 
        empty = false;

    if (existingUser && !empty) {
        return res.status(400).send({message: 'User already exists in the database!'});
    }else if(existingUser2){
        return res.status(400).send({message: 'Email already exists in the database!'});
    }else if(empty) {
        res.status(400).send({message: 'Please fill all the fields!'});
    }else{
        Users.findOne({where : {id : req.params.id}})
        .then( usr => {
            usr.name = req.body.name;
            usr.email = req.body.email;
            usr.password = req.body.password;

            usr.save();
        })
        .then( rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }
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