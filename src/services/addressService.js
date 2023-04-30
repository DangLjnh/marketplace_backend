import db from "../models";
import {
  statusUser,
  groupAccess,
  loginMethod,
  errorCode,
} from "../status/status";
import { Op } from "sequelize";

const createAddressService = async (rawAddressData) => {
  try {
    await db.Address.create({
      isDefault: rawAddressData.isDefault,
      userID: rawAddressData.userID,
    }).then(async (addressItem) => {
      await db.Address_Detail.create({
        full_name: rawAddressData.full_name,
        phone: rawAddressData.phone,
        address: rawAddressData.address,
        city: rawAddressData.city,
        district: rawAddressData.district,
        ward: rawAddressData.ward,
        addressID: addressItem.id,
      });
    });
    return {
      EM: "Create new address successfully!",
      EC: errorCode.SUCCESS,
      DT: "",
    };
  } catch (error) {
    return {
      EM: "Error from server address service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const readAllAddressService = async () => {
  // create new Address
  try {
    const data = await db.Address.findAll({
      order: [["id"]], //ASC
      include: {
        model: db.Address_Detail,
        attributes: [
          "full_name",
          "phone",
          "address",
          "city",
          "district",
          "ward",
        ],
      },
    });
    return {
      EM: "Get all address successfully!",
      EC: errorCode.SUCCESS,
      DT: data,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: addressService.js:64 ~ readAllAddressService ~ error:",
      error
    );
    return {
      EM: "Error from server address service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

module.exports = { createAddressService, readAllAddressService };
