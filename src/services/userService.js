import db from "../models";
import { errorCode } from "../status/status";
const getUserItemService = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id },
      attributes: ["username"],
      include: {
        model: db.User_Detail,
        attributes: ["full_name", "phone", "sex", "photo_url"],
      },
    });
    return {
      EM: "Get user successfully",
      EC: errorCode.SUCCESS,
      DT: user,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: userService.js:5 ~ getUserItemService ~ error:",
      error
    );
    return {
      EM: "Something wrong with user service",
      EC: errorCode.ERROR_SERVER,
      DT: {},
    };
  }
};

module.exports = { getUserItemService };
