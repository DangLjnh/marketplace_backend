import authService from "../services/authService";
import passport from "passport";

const registerUser = async (req, res) => {
  const { username, password, phone } = req.body;
  if (!username || !password || !phone) {
    return res.status(500).json({
      EM: "Missing required parameters!",
      EC: -1,
      DT: "",
    });
  }
  try {
    let data = await authService.registerUserService(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: authController.js:20 ~ registerUser ~ error:",
      error
    );
    return res.status(500).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  }
};

const loginUser = async (req, res, next) => {
  passport.authenticate("local", function (error, user, info) {
    if (error) {
      return res.status(500).json(error);
    }
    if (!user) {
      return res.status(401).json(info.message);
    }
    return res.status(200).json({ ...user });
  })(req, res, next);
};

const verifyToken = async (req, res) => {
  try {
    let data = await authService.verifyTokenService(req.body);
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

module.exports = { registerUser, loginUser, verifyToken };
