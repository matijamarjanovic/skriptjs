'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersNotifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Notifications}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Notifications, {foreignKey: 'notificationId', as: 'notification'});

    }
  }
  UsersNotifications.init({

  }, {
    sequelize,
    modelName: 'UsersNotifications',
  });
  return UsersNotifications;
};