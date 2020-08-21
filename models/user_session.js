'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_session.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'NO ACTION'
      })
    }
  };
  User_session.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User_session',
  });
  return User_session;
};