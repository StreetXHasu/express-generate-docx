'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Docs.init({
    userId: DataTypes.INTEGER,
    docs_groupId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    disc: DataTypes.TEXT,
    data: DataTypes.TEXT,
    format: DataTypes.STRING,
    pin: DataTypes.INTEGER,
    hide: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Docs',
  });
  return Docs;
};