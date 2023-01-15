const express = require('express');
const {sequelize, Users} = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'https://127.0.0.1:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) =>{

    const obj = {
        name: req.body.name,
        email: req.body.email,
        admin : req.body.admin,
        password: bcrypt.hashSync(req.body.password, 10)
    }

    Users.create(obj).then(rows =>{

        const usr = {
            userId: rows.id,
            user: rows.name
        };
        
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token });


    }).catch(err => res.status(500).send({message : "Error registering user (internal server error)"}));
});

app.post('/login', (req, res) =>{
    Users.findOne({ where: { email: req.body.email}})
        .then(usr => {
            
            if (bcrypt.compareSync(req.body.password, usr.password)){
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
                
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
        
                res.json({ token });
        
            }else{
                return res.status(400).send({message: 'Incorrect password'});
            }

        }).catch(err => res.status(500).send({message : "Error logging in (internal server error)"}));
});

app.listen({port: 9090} , async() => {
    await sequelize.authenticate();
});