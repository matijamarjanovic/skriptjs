const { sequelize , Users, Posts, Likes, Comments, Interests, Topics,
    Notifications, UsersNotifications, PinnedPosts, LikedPosts } = require('../models');
 
const express = require('express');
const rtr = require('./users.js');



 module.exports = rtr;