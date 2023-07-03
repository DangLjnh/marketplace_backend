"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here

    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING,
      short_url: DataTypes.STRING,
      current_seller_name: DataTypes.STRING,
      current_seller_logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
