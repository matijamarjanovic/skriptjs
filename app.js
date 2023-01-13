/*const { sequelize, Users, Posts, Comments, Likes, PinnedPosts, LikesPosts, Interests, Topings, Notifications, UsersNotifications } = require('./models');

async function main(){
    await sequelize.authenticate();


    await sequelize.close();
}

main();*/

const express = require('express');
const app = express(); 

app.get('/:ime', (req, res) => {
    res.send(`param: ${req.params.ime}`);
});

//app.use(express.static(path.join(__dirname, '')));

app.listen(8080);