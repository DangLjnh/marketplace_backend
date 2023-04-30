"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address_Detail extends Model {
    static associate(models) {
      // define association here
      Address_Detail.belongsTo(models.Address, {
        foreignKey: "addressID",
      });
    }
  }
  Address_Detail.init(
    {
      full_name: DataTypes.BOOLEAN,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      addressID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Address_Detail",
    }
  );
  return Address_Detail;
};
