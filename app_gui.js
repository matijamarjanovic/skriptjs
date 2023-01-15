const express = require('express');
const path  = require('path');

const cmgui = require('./routes/cmgui.js');
const ingui = require('./routes/ingui.js');
const lkgui = require('./routes/lkgui.js');
const lpgui = require('./routes/lpgui.js');
const ntgui = require('./routes/ntgui.js');
const ppgui = require('./routes/ppgui.js');
const psgui = require('./routes/psgui.js');
const tpgui = require('./routes/tpgui.js');
const ungui = require('./routes/ungui.js');
const usgui = require('./routes/usgui.js');

const {sequelize} = require('./models');
const app = express();

const cors = require('cors');

var corsOptions = {
    origin: 'https://127.0.0.1:8080',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/admin', cmgui);
/*app.use('/admin', ingui);
app.use('/admin', lkgui);
app.use('/admin', lpgui);
app.use('/admin', ntgui);
app.use('/admin', ppgui);
app.use('/admin', psgui);
app.use('/admin', tpgui);
app.use('/admin', ungui);
app.use('/admin', usgui);*/



app.get('/comments', (req, res) =>{
    res.sendFile('comments.html', {root: './static/tabels'});
});

app.get('/interests', (req, res) =>{
    res.sendFile('interests.html', {root: './static/tabels'});
});

app.get('/likedposts', (req, res) =>{
    res.sendFile('likedposts.html', {root: './static/tabels'});
});

app.get('/likes', (req, res) =>{
    res.sendFile('likes.html', {root: './static/tabels'});
});

app.get('/notifications', (req, res) =>{
    res.sendFile('notifications.html', {root: './static/tabels'});
});

app.get('/pinnedposts', (req, res) =>{
    res.sendFile('pinnedposts.html', {root: './static/tabels'});
});

app.get('/posts', (req, res) =>{
    res.sendFile('posts.html', {root: './static/tabels'});
});

app.get('/topics', (req, res) =>{
    res.sendFile('topics.html', {root: './static/tabels'});
});

app.get('/users', (req, res) =>{
    res.sendFile('users.html', {root: './static/tabels'});
});

app.get('/usersnotifications', (req, res) =>{
    res.sendFile('usersnotifications.html', {root: './static/tabels'});
});

app.listen({ port: 6060 }, async() => {
    await sequelize.authenticate();
});