"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Detail.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  User_Detail.init(
    {
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      photo_url: DataTypes.STRING,
      sex: DataTypes.STRING,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_Detail",
    }
  );
  return User_Detail;
};
