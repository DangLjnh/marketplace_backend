"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    static associate(models) {
      // define association here
      Shop.belongsTo(models.User, { foreignKey: "userID" });
      Shop.hasOne(models.Shop_Detail);
    }
  }
  Shop.init(
    {
      feedback_rating: DataTypes.STRING,
      score_rating: DataTypes.STRING,
      id_status: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shop",
    }
  );
  return Shop;
};
