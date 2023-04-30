"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, { foreignKey: "userID" });
      Address.hasOne(models.Address_Detail);
    }
  }
  Address.init(
    {
      isDefault: DataTypes.BOOLEAN,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
