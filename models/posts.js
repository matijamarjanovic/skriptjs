'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Comments, Likes, Notifications, Topics, LikedPosts, PinnedPosts}) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'userId', as: 'user'});
      this.belongsTo(Topics, { foreignKey: 'topicId', as: 'topic'});
      this.hasMany(Comments, { foreignKey: 'postId', as: 'comments', onDelete: 'cascade', hooks: true});
      this.hasMany(Likes, { foreignKey: 'postId', as: 'likes', onDelete: 'cascade', hooks: true} )
      this.hasMany(PinnedPosts, { foreignKey: 'postId', as: 'pinnedposts', onDelete: 'cascade', hooks: true} );
      this.hasMany(Notifications, { foreignKey: 'postId', as: 'notifications', onDelete: 'cascade', hooks: true});
      this.hasMany(LikedPosts, { foreignKey: 'postId', as: 'likedposts', onDelete: 'cascade', hooks: true} );

    }
  }
  Posts.init({
    title: {      
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {      
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};