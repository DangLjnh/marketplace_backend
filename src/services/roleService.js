import db from "../models";
import { errorCode } from "../status/status";

const checkRoleAssignToGroup = async (id) => {
  let result = [];
  const getAllGroupExistRole = await db.Group_Role.findAll({
    where: { roleID: id },
    attributes: ["groupID"],
    raw: true,
    nest: true,
    through: { attributes: [] }, //remove data default of sequelize
  });

  if (getAllGroupExistRole) {
    await Promise.all(
      getAllGroupExistRole.map(async (item) => {
        const data = await db.Group.findOne({
          where: { id: item.groupID },
          attributes: ["name"],
          raw: true,
          nest: true,
          through: { attributes: [] }, //remove data default of sequelize
        });
        result.push(data);
      })
    );
  }

  if (getAllGroupExistRole) {
    return result;
  } else {
    return false;
  }
};

const checkRoleExist = async (url) => {
  const isExistRole = await db.Role.findOne({
    where: { url },
  });
  if (isExistRole) {
    return true;
  } else {
    return false;
  }
};

const createRoleService = async (rawData) => {
  const ADMIN_ID = 6;
  const isExistRole = await checkRoleExist(rawData.url);
  if (isExistRole) {
    return {
      EM: "Role already exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: { isExistRole },
    };
  }

  // create new role
  try {
    await db.Role.create({
      url: rawData.url,
      desc: rawData.desc,
    }).then(async (roleItem) => {
      // after create role add new role to admin
      await db.Group_Role.create({
        roleID: roleItem.id,
        groupID: ADMIN_ID,
      });
    });
    return {
      EM: "Create new role successfully!",
      EC: errorCode.SUCCESS,
      DT: "",
    };
  } catch (error) {
    return {
      EM: "Error from server role service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const readAllRoleService = async () => {
  // create new role
  try {
    const data = await db.Role.findAll({
      order: [["id", "desc"]], //ASC
    });
    return {
      EM: "Get all group successfully!",
      EC: errorCode.SUCCESS,
      DT: data,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: roleService.js:64 ~ readAllRoleService ~ error:",
      error
    );
    return {
      EM: "Error from server role service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const deleteRoleService = async (rawRoleData) => {
  const dataRoleInGroup = await checkRoleAssignToGroup(rawRoleData.id);
  if (dataRoleInGroup.length > 0) {
    const nameListGroup = dataRoleInGroup.map((item) => item.name).join(", ");
    return {
      EM: `Cannot delete, role is assigned to group ${nameListGroup}`,
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    const roleItem = await db.Role.findOne({
      where: { id: rawRoleData.id },
    });
    if (roleItem) {
      await roleItem.destroy();
      return {
        EM: "Delete role successfully",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Role doesn't exist",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    return {
      EM: "Error from server role service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

module.exports = {
  createRoleService,
  readAllRoleService,
  deleteRoleService,
};
