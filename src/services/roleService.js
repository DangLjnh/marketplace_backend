import db from "../models";
import {
  statusUser,
  groupAccess,
  loginMethod,
  errorCode,
} from "../status/status";
import { Op } from "sequelize";

const checkRoleExist = async (url) => {
  const isExistRole = await db.Group.findOne({
    where: { url },
  });
  if (isExistRole) {
    return true;
  } else {
    return false;
  }
};

const createRoleService = async (rawUserData) => {
  const isExistRole = await checkRoleExist(rawUserData.url);
  if (isExistRole) {
    return {
      EM: "Role already exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: { isExistRole },
    };
  }

  // create new role
  try {
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

module.exports = { createRoleService };
