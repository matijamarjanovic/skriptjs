'use strict';
const {
  Model
} = require('sequelize');
const usersnotifications = require('./usersnotifications');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts, Topics, Comments, Likes, UsersNotifications, Interests, PinnedPosts, LikedPosts }) {
      // define association here
      this.hasMany(Posts, { foreignKey: 'userId', as: 'posts', onDelete: 'cascade', hooks: true});
      this.hasMany(Comments, { foreignKey: 'userId', as: 'comments', onDelete: 'cascade', hooks: true});
      this.hasMany(Likes, { foreignKey: 'userId', as: 'likes', onDelete: 'cascade', hooks: true} );
      this.hasMany(UsersNotifications, { foreignKey: 'userId', as: 'notificationsusers', onDelete: 'cascade', hooks: true} );
      this.hasMany(Interests, { foreignKey: 'userId', as: 'interests', onDelete: 'cascade', hooks: true} );
      this.hasMany(PinnedPosts, { foreignKey: 'userId', as: 'pinnedposts', onDelete: 'cascade', hooks: true} );
      this.hasMany(LikedPosts, { foreignKey: 'userId', as: 'likedposts', onDelete: 'cascade', hooks: true} );
      this.hasMany(Topics, { foreignKey: 'userId', as: 'topics', onDelete: 'cascade', hooks: true} );

    }
  }
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Must be valid e-mail adress!' }
      }
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { 
            args: [4, 20],
            msg : 'Must be at least 4 and maximum 20 characters'
          },
        isAlphanumeric: { msg: 'Must be alphanumeric' }
      }
    }, 
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['email', 'password'] }
    },
    modelName: 'Users',
  });
  return Users;
};