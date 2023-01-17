const express = require('express');
const path  = require('path');

const cmgui = require('./routes/comments.js');
const ingui = require('./routes/interests.js');
const lkgui = require('./routes/likes.js');
const lpgui = require('./routes/likedposts.js');
const ntgui = require('./routes/notifications.js');
const ppgui = require('./routes/pinnedposts.js');
const psgui = require('./routes/posts.js');
const tpgui = require('./routes/topics.js');
const ungui = require('./routes/usersnotifications.js');
const usgui = require('./routes/users.js');

const {sequelize} = require('./models');
const app = express();

const cors = require('cors');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/admin', cmgui);
app.use('/admin', ingui);
app.use('/admin', lkgui);
app.use('/admin', lpgui);
app.use('/admin', ntgui);
app.use('/admin', ppgui);
app.use('/admin', psgui);
app.use('/admin', tpgui);
app.use('/admin', ungui);
app.use('/admin', usgui);

app.get('/admin', (req, res) => {
    res.sendFile('homepage.html', {root: './static'});
});

app.get('/comments', (req, res) =>{
    res.sendFile('comments.html', {root: './static/tables'});
});

app.get('/interests', (req, res) =>{
    res.sendFile('interests.html', {root: './static/tables'});
});

app.get('/likedposts', (req, res) =>{
    res.sendFile('likedposts.html', {root: './static/tables'});
});

app.get('/likes', (req, res) =>{
    res.sendFile('likes.html', {root: './static/tables'});
});

app.get('/notifications', (req, res) =>{
    res.sendFile('notifications.html', {root: './static/tables'});
});

app.get('/pinnedposts', (req, res) =>{
    res.sendFile('pinnedposts.html', {root: './static/tables'});
});

app.get('/posts', (req, res) =>{
    res.sendFile('posts.html', {root: './static/tables'});
});

app.get('/topics', (req, res) =>{
    res.sendFile('topics.html', {root: './static/tables'});
});

app.get('/users', (req, res) =>{
    res.sendFile('users.html', {root: './static/tables'});
});

app.get('/usersnotifications', (req, res) =>{
    res.sendFile('usersnotifications.html', {root: './static/tables'});
});

app.listen({ port: process.env.PORT || 6060 }, async() => {
    await sequelize.authenticate();
});