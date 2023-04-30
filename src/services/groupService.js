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

const createGroupService = async (rawGroupData) => {
  try {
    const { name, desc, dataGroup } = rawGroupData;
    const filterDataCheck = dataGroup.filter((item) => {
      return item.isAssigned === true;
    });
    if (rawGroupData) {
      const group = await db.Group.create({
        name,
        desc,
      });
      const formatData = [];
      filterDataCheck.forEach((item) =>
        formatData.push({
          groupID: +group.id,
          roleID: +item.id,
        })
      );
      await db.Group_Role.bulkCreate(formatData);
      return {
        EM: "Create group successfully!",
        EC: 0,
        DT: {},
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};

const readAllGroupService = async () => {
  try {
    const data = await db.Group.findAll({
      order: [["id"]], //ASC
    });
    return {
      EM: "Get all group successfully!",
      EC: errorCode.SUCCESS,
      DT: data,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: groupService.js:67 ~ readAllGroupService ~ error:",
      error
    );
    return {
      EM: "Error from server group service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const readGroupWithRoleService = async (userItem) => {
  const role = await db.Role.findAll({
    attributes: ["url", "desc", "id"],
    include: {
      model: db.Group,
      where: { id: userItem.groupID },
      attributes: ["name", "desc", "id"], // find in table mapping
      through: { attributes: [] }, //remove data default of sequelize
    },
    raw: true,
    nest: true,
  });
  return role;
};

module.exports = {
  createGroupService,
  readAllGroupService,
  readGroupWithRoleService,
};
