const express = require('express');
const {sequelize, Users} = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'https://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) =>{

});

app.post('/login', (req, res) =>{

});

app.listen({port: 9090} , async() => {
    await sequelize.authenticate();
});