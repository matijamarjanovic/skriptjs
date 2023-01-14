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
const { resourceLimits } = require('worker_threads');

const app = express();

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

app.get('/', (req, res) =>{
    res.send('index.html');
});

app.listen({ port: 8000 }, async() => {
    await sequelize.authenticate();
});