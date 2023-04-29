import userService from "../services/userService";

const createUser = async (req, res) => {
  // let data = await userService.getAllUser();
  // return res.status(200).json({
  //   EM: data.EM, // error message
  //   EC: data.EC, //error code
  //   DT: data.DT, //data
  // });
};

const getUserAccount = async (req, res) => {
  try {
    let data = await userService.getUserItemService(+req.user.id);
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

module.exports = { createUser, getUserAccount };
