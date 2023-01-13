
//const { application } = require('express');
const { sequelize, Users, Posts, Topics } = require('./models');
const posts = require('./models/posts');

async function main(){
    await sequelize.authenticate();

    let user, user1, post, post1, topic1, topic;

    // user1 = await Users.create({
    //     name: 'user1223',
    //     email: 'user222@example.com',
    //     password: 'password'

    //  });

    //  topic1 = await Topics.create({
    //     userId: user1.id,
    //     name: 'tema132',   
    //     description: 'opis123'
    //  });

    // post = await Posts.create({
    //     title: 'naziv12332',
    //     content: 'sadrzaj12',
    //     userId: user1.id,
    //     topicId: topic1.id
    //  });

    user = await Users.findAll();
    topic = await Topics.findAll();

    //user = await user.destroy();

    user = await Users.findAll();
    console.log(JSON.stringify(user));
    //console.log(user);

    await sequelize.close();
}

main();

