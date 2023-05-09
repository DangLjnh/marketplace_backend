import db from "../models";
import { errorCode } from "../status/status";
import { Op } from "sequelize";

const checkGroupExist = async (rawUserData) => {
  const isExistGroup = await db.Group.findOne({
    where: {
      [Op.or]: [{ name: rawUserData }, { id: rawUserData }],
    },
  });
  if (isExistGroup) {
    return true;
  } else {
    return false;
  }
};

const checkGroupAssignToRole = async (id) => {
  const isExistGroup = await checkGroupExist(rawGroupData.name);
  if (!isExistGroup) {
    return {
      EM: "Group doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  let result = [];
  const getAllRoleExistGroup = await db.Group_Role.findAll({
    where: { groupID: +id },
    attributes: ["roleID"],
    raw: true,
    nest: true,
    through: { attributes: [] }, //remove data default of sequelize
  });

  if (getAllRoleExistGroup) {
    await Promise.all(
      getAllRoleExistGroup.map(async (item) => {
        const data = await db.Role.findOne({
          where: { id: item.roleID },
          attributes: ["url"],
          raw: true,
          nest: true,
          through: { attributes: [] }, //remove data default of sequelize
        });
        result.push(data);
      })
    );
  }

  if (getAllRoleExistGroup) {
    return result;
  } else {
    return false;
  }
};

const checkGroupAssignToUser = async (id) => {
  const getAllUserExistGroup = await db.User.findAll({
    where: { groupID: +id },
    attributes: ["id"],
    raw: true,
    nest: true,
    through: { attributes: [] }, //remove data default of sequelize
  });
  if (getAllUserExistGroup) {
    return getAllUserExistGroup;
  } else {
    return false;
  }
};

const createGroupService = async (rawGroupData) => {
  const isExistGroup = await checkGroupExist(rawGroupData.name);
  if (isExistGroup) {
    return {
      EM: "Group already exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
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

const deleteGroupService = async (rawGroupData) => {
  if (!rawGroupData.id) {
    return {
      EM: "ID is required!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  const isExistGroup = await checkGroupExist(rawGroupData.id);
  if (!isExistGroup) {
    return {
      EM: "Group doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  const dataGroupInRole = await checkGroupAssignToRole(rawGroupData.id);
  const dataUser = await checkGroupAssignToUser(rawGroupData.id);
  if (dataGroupInRole.length > 0) {
    const nameListGroup = dataGroupInRole.map((item) => item.url).join(", ");
    return {
      EM: `Cannot delete, group is assigned to role ${nameListGroup}`,
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  if (dataUser.length > 0) {
    const nameList = dataUser.map((item) => item.id).join(", ");
    return {
      EM: `Cannot delete, group is assigned to user id: ${nameList}`,
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    const groupItem = await db.Group.findOne({
      where: { id: rawGroupData.id },
    });
    if (groupItem) {
      await groupItem.destroy();
      return {
        EM: "Delete group successfully",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Group doesn't exist",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    return {
      EM: "Error from server group service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const updateGroupService = async (rawGroupData) => {
  const isExistGroup = await checkGroupExist(rawGroupData.id);
  if (!isExistGroup) {
    return {
      EM: "Group is not exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  const isExistNameGroup = await checkGroupExist(rawGroupData.name);
  if (isExistNameGroup) {
    return {
      EM: "Name of group already exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    if (rawGroupData.dataGroup && rawGroupData.dataGroup.length > 0) {
      await db.Group.update(
        {
          name: rawGroupData.name,
          desc: rawGroupData.desc,
        },
        { where: { id: rawGroupData.id } }
      ).then(async () => {
        await db.Group_Role.destroy({
          where: { groupID: rawGroupData.id },
        }).then(async () => {
          await db.Group_Role.bulkCreate(rawGroupData.dataGroup);
        });
      });
      return {
        EM: "Update group successful!",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Must be assign 1 role to group!",
        EC: errorCode.ERROR_PARAMS,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: errorCode.ERROR_PARAMS,
      DT: [],
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
  deleteGroupService,
  updateGroupService,
};
