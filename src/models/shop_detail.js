"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop_Detail extends Model {
    static associate(models) {
      // define association here
      Shop_Detail.belongsTo(models.Shop, { foreignKey: "shopID" });
    }
  }
  Shop_Detail.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      photo_url: DataTypes.STRING,
      shopID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shop_Detail",
    }
  );
  return Shop_Detail;
};
