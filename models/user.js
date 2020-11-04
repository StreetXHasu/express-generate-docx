"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      user_login: {
        type: DataTypes.STRING,
      },
      user_password: {
        type: DataTypes.STRING,
      },
      user_name: {
        type: DataTypes.STRING,
      },
      user_tag: {
        type: DataTypes.STRING,
      },
      user_hide: {
        type: DataTypes.INTEGER,
        defaultValue: "0",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
