const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
   Notifications, UsersNotifications, PinnedPosts, LikedPosts, Sequelize } = require('../models');

const express = require('express');
const usr = express.Router();
const joi = require('joi');

usr.use(express.json());
usr.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    

    if (token === null) return res.status(401).json({message : 'Error'});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
        if (err) {
            return res.status(403).json({message : 'Access Denied'});
        }

        req.user = usr;

        next();
    });
}

//usr.use(authToken);

const validation = joi.object({
    name: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(4).max(5).trim(true).required(),
    admin: joi.boolean().required()
.default([]),
   is_active: joi.boolean().default(true),
});

usr.get('/users', (req, res) => {
    Users.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});


usr.get('/users/:id', (req, res) => {
    Users.findOne({where : {id : req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).send({message : 'Server internal error'}));
});

usr.post('/users/', async (req, res) => {

                const payload = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    admin: req.body.admin
                };

                const {err} = validation.validate(payload);

                if (err) {
                    res.status(400).send({message: 'Invalid data'});
                }else{
                    Users.create({ name: req.body.name, email: req.body.email, password: req.body.password, admin: req.body.admin})
                        .then(rows => res.json(rows))
                        .catch(err => res.status(500).send({message : 'Server internal error'}));
                }
                    
    
});

usr.put('/users/:id', async (req, res) => {

            const payload = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin
            };

            const {err} = validation.validate(payload);

            if (err) {
                res.status(400).send({message: 'Invalid data'});
            }else{
                        Users.findOne({where : {id : req.params.id}})
                        .then( usr => {
                            usr.name = req.body.name;
                            usr.email = req.body.email;
                            usr.password = req.body.password;
                            usr.admin = req.body.admin;
                            
                            usr.save();
                        })
                        .then( rows => res.json(rows))
                        .catch(err => res.status(500).send({message : 'Server internal error'}));
                    }
                    
        
    });
    

usr.delete('/users/:id', (req, res) => {
    
            const payload = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin
            };

            const {err} = validation.validate(payload);

            if (err) {
                res.status(400).send({message: 'Invalid data'});
            }else{
    
                Users.findOne({where : {id : req.params.id}})
                .then( usr => {
                    usr.destroy();
                })
                .then( rows => res.json(rows))
                .catch(err => res.status(500).send({message : 'Server internal error'}));
            }

 });



module.exports = usr;