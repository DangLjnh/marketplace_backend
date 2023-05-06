import db from "../models";
import { statusUser, errorCode } from "../status/status";
import authService from "./authService";
var cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

//upload file to cloudinary
const uploadFromBuffer = (request) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "foo",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(request.data).pipe(cld_upload_stream);
  });
};

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

const updateUserService = async (file, data) => {
  let photo = file && file !== undefined && (await uploadFromBuffer(file));
  const rawUserData = JSON.parse(data);

  // check exist
  if (!rawUserData.id) {
    return {
      EM: "ID is required!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  const isExistUser = await authService.checkUserExist(rawUserData.id);
  if (!isExistUser) {
    return {
      EM: "User doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }

  try {
    const rawData = {
      full_name: rawUserData.fullName,
      email: rawUserData.email,
      sex: rawUserData.sex,
    };
    if (file) {
      rawData.photo_url = photo.url;
    }
    let userItem = await db.User_Detail.findOne({
      where: { userID: rawUserData.id },
      attributes: ["photo_url"], // find in table mapping
      raw: true,
      nest: true,
      through: { attributes: [] }, //remove data default of sequelize
    });

    // delete old image
    if (userItem?.photo_url && file) {
      // get publicID and delete image
      const publicID = userItem.photo_url.match(/\/v\d+\/(.+)\.\w{3,4}$/)[1];
      cloudinary.uploader.destroy(publicID, function (error, result) {
        console.log(result, error);
      });
    }

    // update user
    await db.User.update(
      {
        phone: rawUserData.phone,
        username: rawUserData.email,
        id_status: rawUserData.id_status,
        groupID: rawUserData.groupID,
      },
      { where: { id: rawUserData.id } }
    ).then(async () => {
      await db.User_Detail.update(rawData, {
        where: { userID: rawUserData.id },
      });
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
  uploadFromBuffer,
};
