import userService from "../services/userService";

const readAllUser = async (req, res) => {
  try {
    let data = await userService.readAllUserService();
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

const readUserAccount = async (req, res) => {
  try {
    let data = await userService.readUserAccountService(+req.user.id);
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

const readSingleUser = async (req, res) => {
  try {
    let data = await userService.readUserAccountService(req.params.id);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: userController.js:54 ~ readSingleUser ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let data = await userService.updateUserService(
      req?.files?.file,
      req.body.data
    );
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log("🚀 ~ file: userController.js:75 ~ updateUser ~ error:", error);
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const banUser = async (req, res) => {
  try {
    let data = await userService.banUserService(req.params.id);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log("🚀 ~ file: userController.js:93 ~ banUser ~ error:", error);
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

module.exports = {
  readUserAccount,
  readAllUser,
  readSingleUser,
  updateUser,
  banUser,
};
