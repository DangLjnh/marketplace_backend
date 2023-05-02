import db from "../models";
import { statusUser, errorCode } from "../status/status";
import authService from "./authService";

const readAllUserService = async () => {
  try {
    const data = await db.User.findAll({
      order: [["id"]], //ASC
      attributes: ["id", "username", "phone", "id_login_method", "id_status"],
      include: [
        {
          model: db.User_Detail,
          attributes: ["full_name", "email", "sex", "photo_url"],
        },
        {
          model: db.Group,
          attributes: ["name"],
        },
      ],
    });
    return {
      EM: "Get all user successfully!",
      EC: errorCode.SUCCESS,
      DT: data,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: userService.js:54 ~ readAllUserService ~ error:",
      error
    );
    return {
      EM: "Error from server user service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const readUserAccountService = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id },
      attributes: ["id", "username", "phone", "id_login_method", "id_status"],
      include: [
        {
          model: db.User_Detail,
          attributes: ["full_name", "email", "sex", "photo_url"],
        },
        {
          model: db.Group,
          attributes: ["name"],
        },
      ],
    });
    return {
      EM: "Get user successfully",
      EC: errorCode.SUCCESS,
      DT: user,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: userService.js:5 ~ readUserAccountService ~ error:",
      error
    );
    return {
      EM: "Something wrong with user service",
      EC: errorCode.ERROR_SERVER,
      DT: {},
    };
  }
};

const updateUserService = async (rawUserData) => {
  const isExistUser = await authService.checkUserExist(rawUserData.id);
  if (!isExistUser) {
    return {
      EM: "User doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    await db.User.update(
      {
        phone: rawUserData.phone,
        id_status: rawUserData.id_status,
        groupID: rawUserData.groupID,
      },
      { where: { id: rawUserData.id } }
    ).then(async () => {
      await db.User_Detail.update(
        {
          full_name: rawUserData.full_name,
          email: rawUserData.username,
          sex: rawUserData.sex,
          photo_url: rawUserData.photo_url,
        },
        { where: { userID: rawUserData.id } }
      );
    });
    return {
      EM: "Update user successfully",
      EC: errorCode.SUCCESS,
      DT: "",
    };
  } catch (error) {
    return {
      EM: "Error from server user service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const banUserService = async (id) => {
  const isExistUser = await authService.checkUserExist(id);
  if (!isExistUser) {
    return {
      EM: "User doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    await db.User.update(
      {
        id_status: statusUser.BAN,
      },
      { where: { id } }
    );
    return {
      EM: "Ban user successfully",
      EC: errorCode.SUCCESS,
      DT: "",
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: userService.js:137 ~ banUserService ~ error:",
      error
    );
    return {
      EM: "Error from server user service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

module.exports = {
  readUserAccountService,
  readAllUserService,
  updateUserService,
  banUserService,
};
