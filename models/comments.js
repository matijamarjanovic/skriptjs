'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Posts, Users}) {
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Posts, {foreignKey: 'postId', as: 'post'});
    }
  }
  Comments.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};