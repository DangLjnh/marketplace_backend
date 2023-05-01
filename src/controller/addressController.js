import addressService from "../services/addressService";

const createAddress = async (req, res) => {
  try {
    let data = await addressService.createAddressService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: addressController.js:12 ~ createAddress ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const readAllAddress = async (req, res) => {
  try {
    let data = await addressService.readAllAddressService();
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: addressController.js:33 ~ readAllAddress ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    let data = await addressService.updateAddressService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: addressController.js:12 ~ createAddress ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    let data = await addressService.deleteAddressService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: addressController.js:75 ~ deleteAddress ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

module.exports = {
  createAddress,
  readAllAddress,
  deleteAddress,
  updateAddress,
};
