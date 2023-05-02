import bcrypt from "bcryptjs";
import db from "../models";
import { readGroupWithRoleService } from "../services/groupService";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../middleware/JwtAction";
import {
  statusUser,
  groupAccess,
  loginMethod,
  errorCode,
} from "../status/status";
const salt = bcrypt.genSaltSync(10);
import { Op } from "sequelize";

const checkUserExist = async (rawUserData) => {
  const isExistUser = await db.User.findOne({
    where: {
      [Op.or]: [
        { id: rawUserData },
        { username: rawUserData },
        { phone: rawUserData },
      ],
    },
  });
  if (isExistUser) {
    return true;
  } else {
    return false;
  }
};

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt); //hash password
  return hashPassword;
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword); // true
};

const registerUserService = async (rawUserData) => {
  const isPhoneExist = await checkUserExist(rawUserData.phone);
  const isUsernameExist = await checkUserExist(rawUserData.username);

  if (isUsernameExist) {
    return {
      EM: "Email already exist",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  if (isPhoneExist) {
    return {
      EM: "Phone number already exist",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }

  // hash password user
  const hashPass = hashPassword(rawUserData.password);
  // create new user
  try {
    await db.User.create({
      username: rawUserData.username,
      phone: rawUserData.phone,
      password: hashPass,
      id_login_method: loginMethod.LOCAL,
      id_status: statusUser.ACTIVE,
      groupID: groupAccess.CUSTOMER,
    }).then(async (dataUser) => {
      await db.User_Detail.create({
        full_name: rawUserData.full_name,
        email: rawUserData.username,
        sex: rawUserData.sex,
        photo_url: rawUserData.photo_url,
        userID: dataUser.id,
      });
    });
    return {
      EM: "Register successfully",
      EC: errorCode.SUCCESS,
      DT: "",
    };
  } catch (error) {
    return {
      EM: "Error from server auth service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const loginUserService = async (rawUserData) => {
  try {
    const userItem = await db.User.findOne({
      where: {
        [Op.or]: [
          { username: rawUserData.username },
          { phone: rawUserData.username },
        ],
      },
    });
    if (userItem) {
      const checkCorrectPassword = checkPassword(
        rawUserData.password,
        userItem.password
      );
      const roleOfUser = await readGroupWithRoleService(userItem);
      const payloadAccessToken = {
        id: userItem.id,
        groupID: userItem.groupID,
        role: roleOfUser,
        // username: userItem.username,
        // email: userItem.email,
      };
      const payloadRefreshToken = {
        id: userItem.id,
      };
      const accessToken = createAccessToken(payloadAccessToken);
      const refreshToken = createRefreshToken(payloadRefreshToken);
      if (checkCorrectPassword) {
        return {
          EM: "Login successfully!",
          EC: errorCode.SUCCESS,
          DT: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        };
      } else {
        return {
          EM: "Your email or phone or password is incorrect!",
          EC: errorCode.ERROR_PARAMS,
          DT: {},
        };
      }
    } else {
      return {
        EM: "Your email or phone or password is incorrect!",
        EC: errorCode.ERROR_PARAMS,
        DT: {},
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong in auth service...",
      EC: errorCode.ERROR_SERVER,
      DT: {},
    };
  }
};

const verifyTokenService = async (rawData) => {
  const token = rawData.refresh_token;
  const decodedRefreshToken = verifyToken(token);
  try {
    if (decodedRefreshToken) {
      const refresh_token = createRefreshToken({ id: decodedRefreshToken.id });
      const access_token = createAccessToken({ id: decodedRefreshToken.id });
      return {
        EM: "Verify token successfully!",
        EC: errorCode.SUCCESS,
        DT: {
          access_token,
          refresh_token,
        },
      };
    } else {
      return {
        EM: "Your refresh token has expired!",
        EC: errorCode.ERROR_PARAMS,
        DT: {},
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong in auth service",
      EC: errorCode.ERROR_SERVER,
      DT: {},
    };
  }
};

module.exports = {
  registerUserService,
  loginUserService,
  verifyTokenService,
  checkUserExist,
};
