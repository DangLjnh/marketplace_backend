import shopService from "../services/shopService";

const createShop = async (req, res) => {
  try {
    let data = await shopService.createShopService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log("🚀 ~ file: shopController.js:12 ~ createShop ~ error:", error);
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const readAllShop = async (req, res) => {
  try {
    let data = await shopService.readAllShopService();
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: shopController.js:33 ~ readAllShop ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const readSingleShope = async (req, res) => {
  try {
    let data = await shopService.readSingleShopeService(req.params.id);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: shopController.js:33 ~ readSingleShope ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const updateShop = async (req, res) => {
  try {
    let data = await shopService.updateShopService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log("🚀 ~ file: shopController.js:12 ~ updateShop ~ error:", error);
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const banShop = async (req, res) => {
  try {
    let data = await shopService.banShopService(req.body.id);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: shopController.js:33 ~ readSingleShope ~ error:",
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
  createShop,
  readAllShop,
  readSingleShope,
  updateShop,
  banShop,
};
