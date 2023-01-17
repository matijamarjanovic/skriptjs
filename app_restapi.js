const express = require('express');
const path = require('path');

const usrs = require('./routes/users.js');
const psts = require('./routes/posts.js');
const cmts = require('./routes/comments.js');
const lks = require('./routes/likes.js');
const intrsts = require('./routes/interests.js');
const tpcs = require('./routes/topics.js');
const notifs = require('./routes/notifications.js');
const usrsnotifs = require('./routes/usersnotifications.js');
const lpsts = require('./routes/likedposts.js');
const ppsts = require('./routes/pinnedposts.js');



const { sequelize } = require('./models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const cors = require('cors');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions)); 

app.use('/api', usrs);
app.use('/api', psts);
app.use('/api', cmts);
app.use('/api', lks);
app.use('/api', intrsts);
app.use('/api', tpcs);
app.use('/api', notifs);
app.use('/api', usrsnotifs);
app.use('/api', lpsts);
app.use('/api', ppsts);

app.use(express.static(path.join(__dirname, 'static')));


function getCookies(req){
    if (req.headers.cookie == null) return {};

    const rawCookie = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookie.forEach(el => {
        const tmp = el.split('=');
        parsedCookies[tmp[0]] = tmp[1];
    });

    return parsedCookies;
}

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];

    if (token === null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
        if (err) return res.redirect(301, '/login');

        req.user = usr;

        next();
    });
}

app.get('/', authToken, (req, res) =>{
    res.sendFile('homepage.html', {root: './static'});
});

app.get('/api', authToken, (req, res) =>{
    res.sendFile('index.html', {root: './static'});
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/register',  (req, res) => {
  res.sendFile('register.html', { root: './static' });
});


app.listen({port: process.env.PORT ||  8080 }, async() => {
    await sequelize.authenticate();
});