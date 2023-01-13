'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Posts, Interests}) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'userId', as: 'user'});
      this.hasMany(Posts, { foreignKey: 'topicId', as: 'posts', onDelete: 'cascade', hooks: true});
      this.hasMany(Interests, { foreignKey: 'topicId', as: 'interests', onDelete: 'cascade', hooks: true});

    }
  }
  Topics.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topics',
  });
  return Topics;
};