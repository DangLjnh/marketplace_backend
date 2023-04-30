import jwt from "jsonwebtoken";
require("dotenv").config();

const extractToken = (req) => {
  if (req.headers?.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (err) {
    console.log(err);
  }
  return decoded;
};

const createAccessToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createRefreshToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checkUserJwt = (req, res, next) => {
  const tokenFromHeader = extractToken(req);
  if (tokenFromHeader) {
    const accessToken = tokenFromHeader;
    const decoded = verifyToken(accessToken);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EM: "Your access token has expired!",
        EC: 1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authenticated the user",
      EC: -1,
      DT: "",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (req?.user) {
    let currentUrl = req?.path;
    const canAccess = req.user.role.some((item) => item.url === currentUrl);
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EM: "You don't have permission to access this resource!",
        EC: -1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authenticated the user",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  checkUserJwt,
  checkUserPermission,
};
