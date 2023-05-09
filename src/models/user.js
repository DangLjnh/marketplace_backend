"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.User_Detail);
      User.hasOne(models.Shop);
      User.hasMany(models.Address);
      User.belongsTo(models.Group, { foreignKey: "groupID" });
    }
  }
  User.init(
    {
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      phone: DataTypes.STRING,
      id_login_method: DataTypes.STRING,
      id_status: DataTypes.INTEGER,
      groupID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
