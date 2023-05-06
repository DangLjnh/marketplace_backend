import db from "../models";
import { errorCode } from "../status/status";
import { checkUserExist } from "./authService";
const checkAddressExist = async (id) => {
  const isExistAddress = await db.Address.findOne({
    where: { id },
  });
  if (isExistAddress) {
    return true;
  } else {
    return false;
  }
};

const createAddressService = async (rawAddressData) => {
  const isExistUser = await checkUserExist(rawAddressData.userID);
  if (!isExistUser) {
    return {
      EM: "User doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
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
        city_code: rawAddressData.city_code,
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

const readAllAddressOfUserService = async (userID) => {
  const isExistUser = await checkUserExist(userID);
  if (!isExistUser) {
    return {
      EM: "User doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  // create new Address
  try {
    const data = await db.Address.findAll({
      where: { userID },
      order: [["id"]], //ASC
      attributes: ["id", "isDefault", "userID"],
      include: {
        model: db.Address_Detail,
        attributes: [
          "full_name",
          "phone",
          "address",
          "city",
          "city_code",
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

const readSingleAddressService = async (addressID) => {
  const isExistAddress = await checkAddressExist(addressID);
  if (!isExistAddress) {
    return {
      EM: "Address doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    const data = await db.Address.findOne({
      where: { id: addressID },
      attributes: ["id", "isDefault", "userID"],
      include: {
        model: db.Address_Detail,
        attributes: [
          "full_name",
          "phone",
          "address",
          "city",
          "city_code",
          "district",
          "ward",
        ],
      },
      raw: true,
      nest: true,
      through: { attributes: [] }, //remove data default of sequelize
    });
    return {
      EM: "Read single address successfully!",
      EC: errorCode.SUCCESS,
      DT: data,
    };
  } catch (error) {
    return {
      EM: "Error from server address service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const deleteAddressService = async (addressID) => {
  const IS_ADDRESS_DEFAULT = true;
  const isExistAddress = await checkAddressExist(addressID);
  if (!isExistAddress) {
    return {
      EM: "Address doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    const addressItem = await db.Address.findOne({
      where: { id: addressID },
    });
    const addressDetailItem = await db.Address_Detail.findOne({
      where: { addressID: addressID },
    });
    if (addressItem.isDefault === IS_ADDRESS_DEFAULT) {
      return {
        EM: "Cannot delete address default!",
        EC: errorCode.ERROR_PARAMS,
        DT: "",
      };
    }
    if (addressItem && addressDetailItem) {
      await addressItem.destroy();
      await addressDetailItem.destroy();
      return {
        EM: "Delete address successfully!",
        EC: errorCode.SUCCESS,
        DT: "",
      };
    } else {
      return {
        EM: "Address doesn't exist!",
        EC: errorCode.ERROR_PARAMS,
        DT: "",
      };
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: addressService.js:93 ~ deleteAddressService ~ error:",
      error
    );
    return {
      EM: "Error from server address service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const updateAddressService = async (rawAddressData) => {
  const isExistAddress = await checkAddressExist(rawAddressData.id);
  if (!isExistAddress) {
    return {
      EM: "Address doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    if (rawAddressData.isDefault === true) {
      await db.Address.findOne({
        where: { isDefault: true },
      }).then((data) => {
        db.Address.update(
          {
            isDefault: false,
          },
          { where: { id: data.id } }
        );
      });
    }
    await db.Address.update(
      {
        isDefault: rawAddressData.isDefault,
      },
      { where: { id: rawAddressData.id } }
    ).then(async () => {
      await db.Address_Detail.update(
        {
          full_name: rawAddressData.full_name,
          phone: rawAddressData.phone,
          address: rawAddressData.address,
          city: rawAddressData.city,
          city_code: rawAddressData.city_code,
          district: rawAddressData.district,
          ward: rawAddressData.ward,
        },
        { where: { addressID: rawAddressData.id } }
      );
    });
    return {
      EM: "Update address successfully!",
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

const defaultAddressService = async (addressID) => {
  const isExistAddress = await checkAddressExist(addressID);
  if (!isExistAddress) {
    return {
      EM: "Address doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    await db.Address.findOne({
      where: { isDefault: true },
    }).then((data) => {
      db.Address.update(
        {
          isDefault: false,
        },
        { where: { id: data.id } }
      );
    });

    await db.Address.update(
      {
        isDefault: true,
      },
      { where: { id: addressID } }
    );
    return {
      EM: "Update address successfully!",
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

module.exports = {
  createAddressService,
  readAllAddressOfUserService,
  deleteAddressService,
  updateAddressService,
  readSingleAddressService,
  defaultAddressService,
};
