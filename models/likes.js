'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Posts}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Posts, {foreignKey: 'postId', as: 'post'});
    }
  }
  Likes.init({

  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};