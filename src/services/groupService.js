import db from "../models";
import {
  statusUser,
  groupAccess,
  loginMethod,
  errorCode,
} from "../status/status";
import { Op } from "sequelize";

const checkGroupExist = async (name) => {
  const isExistGroup = await db.Group.findOne({
    where: { name },
  });
  if (isExistGroup) {
    return true;
  } else {
    return false;
  }
};

const createGroupService = async (rawUserData) => {
  const isExistGroup = await checkGroupExist(rawUserData.name);
  if (isExistGroup) {
    return {
      EM: "Group already exist!",
      EC: 1,
      DT: { isExistGroup },
    };
  }

  // create new group
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

module.exports = { createGroupService };
