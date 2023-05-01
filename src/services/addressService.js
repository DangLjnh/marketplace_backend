import db from "../models";
import { errorCode } from "../status/status";

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

const deleteAddressService = async (rawAddressData) => {
  const ADDRESS_DEFAULT = true;
  const isExistAddress = await checkAddressExist(rawAddressData.id);
  if (!isExistAddress) {
    return {
      EM: "Address doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    const addressItem = await db.Address.findOne({
      where: { id: rawAddressData.id },
    });
    const addressDetailItem = await db.Address_Detail.findOne({
      where: { addressID: rawAddressData.id },
    });
    if (addressItem.isDefault === ADDRESS_DEFAULT) {
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

module.exports = {
  createAddressService,
  readAllAddressService,
  deleteAddressService,
  updateAddressService,
};
