import roleService from "../services/roleService";

const createRole = async (req, res) => {
  try {
    let data = await roleService.createRoleService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log("🚀 ~ file: roleController.js:12 ~ createRole ~ error:", error);
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const readAllRole = async (req, res) => {
  try {
    let data = await roleService.readAllRoleService();
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: authController.js:55 ~ verifyToken ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    let data = await roleService.deleteRoleService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log("🚀 ~ file: roleController.js:51 ~ deleteRole ~ error:", error);
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

module.exports = { createRole, readAllRole, deleteRole };
