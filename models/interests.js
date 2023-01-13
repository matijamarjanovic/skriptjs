'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Topics}) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'userId', as: 'user'});
      this.belongsTo(Topics, { foreignKey: 'topicId', as: 'topic'});

    }
  }
  Interests.init({

  }, {
    sequelize,
    modelName: 'Interests',
  });
  return Interests;
};