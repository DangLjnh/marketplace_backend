import db from "../models";
import { errorCode, statusShop } from "../status/status";
import { Op } from "sequelize";

const checkNotExist = () => {};

const checkShopExist = async (rawShopData) => {
  const isShopExist = await db.Shop.findOne({
    where: {
      [Op.or]: [{ id: rawShopData }, { slug: rawShopData }],
    },
  });
  const isShopExists = await db.Shop_Detail.findOne({
    where: {
      [Op.or]: [
        { name: rawShopData },
        { phone: rawShopData },
        { email: rawShopData },
      ],
    },
  });
  if (isShopExist || isShopExists) {
    return true;
  } else {
    return false;
  }
};

const checkUserExistShop = async (userID) => {
  const isUserExistShop = await db.Shop.findOne({
    where: {
      [Op.or]: [{ userID: userID }],
    },
  });
  if (isUserExistShop) {
    return true;
  } else {
    return false;
  }
};

const createShopService = async (rawShopData) => {
  const isNameExist = await checkShopExist(rawShopData.name);
  const isPhoneExist = await checkShopExist(rawShopData.phone);
  const isEmailExist = await checkShopExist(rawShopData.email);
  const isSlugExist = await checkShopExist(rawShopData.slug);
  const isUserExistShop = await checkUserExistShop(rawShopData.userID);

  if (isEmailExist) {
    return {
      EM: "Email already exist",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  if (isSlugExist) {
    return {
      EM: "Slug already exist",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  if (isNameExist) {
    return {
      EM: "Name already exist",
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
  if (isUserExistShop) {
    return {
      EM: "User already have shop!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }

  // create new shop
  try {
    await db.Shop.create({
      slug: rawShopData.slug,
      id_status: statusShop.ACTIVE,
      userID: rawShopData.userID,
    }).then(async (dataShop) => {
      await db.Shop_Detail.create({
        name: rawShopData.name,
        phone: rawShopData.phone,
        email: rawShopData.email,
        address: rawShopData.address,
        city: rawShopData.city,
        district: rawShopData.district,
        ward: rawShopData.ward,
        photo_url: rawShopData.photo_url,
        shopID: dataShop.id,
      });
    });
    return {
      EM: "Create new shop successfully!",
      EC: errorCode.SUCCESS,
      DT: "",
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: shopService.js:42 ~ createShopService ~ error:",
      error
    );
    return {
      EM: "Error from server shop service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const readAllShopService = async () => {
  try {
    const data = await db.Shop.findAll({
      order: [["id"]], //ASC
      attributes: [
        "id",
        "feedback_rating",
        "score_rating",
        "id_status",
        "userID",
      ],
      include: [
        {
          model: db.Shop_Detail,
          attributes: [
            "name",
            "email",
            "phone",
            "photo_url",
            "address",
            "city",
            "ward",
            "district",
            "photo_url",
          ],
        },
        // {
        //   model: db.User,
        //   attributes: ["id"],
        //   include: {
        //     model: db.User_Detail,
        //     attributes: ["full_name", "photo_url"],
        //   },
        // },
      ],
    });
    return {
      EM: "Get all shop successfully!",
      EC: errorCode.SUCCESS,
      DT: data,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: shopService.js:123 ~ readAllShopService ~ error:",
      error
    );
    return {
      EM: "Error from server shop service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const readSingleShopeService = async (slug) => {
  if (!slug) {
    return {
      EM: "ID is required!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  const isShopExist = await checkShopExist(slug);
  if (!isShopExist) {
    return {
      EM: "Shop doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    const data = await db.Shop.findOne({
      where: { slug },
      attributes: [
        "id",
        "feedback_rating",
        "score_rating",
        "id_status",
        "userID",
        "createdAt",
      ],
      include: [
        {
          model: db.Shop_Detail,
          attributes: [
            "name",
            "email",
            "phone",
            "photo_url",
            "address",
            "city",
            "ward",
            "district",
            "photo_url",
          ],
        },
      ],
    });
    return {
      EM: "Get single shop successfully!",
      EC: errorCode.SUCCESS,
      DT: data,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: shopService.js:123 ~ readSingleShopService ~ error:",
      error
    );
    return {
      EM: "Error from server shop service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const updateShopService = async (rawShopData) => {
  if (!rawShopData.id) {
    return {
      EM: "ID is required!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  const isShopExist = await checkShopExist(rawShopData.id);
  if (!isShopExist) {
    return {
      EM: "Shop doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }

  if (rawShopData.slug) {
    const isSlugExist = await checkShopExist(rawShopData.slug);
    if (isSlugExist) {
      return {
        EM: "Slug already exist",
        EC: errorCode.ERROR_PARAMS,
        DT: "",
      };
    }
  }

  if (rawShopData.name) {
    const isNameExist = await checkShopExist(rawShopData.name);
    if (isNameExist) {
      return {
        EM: "Name already exist",
        EC: errorCode.ERROR_PARAMS,
        DT: "",
      };
    }
  }

  if (rawShopData.phone) {
    const isPhoneExist = await checkShopExist(rawShopData.phone);
    if (isPhoneExist) {
      return {
        EM: "Phone already exist",
        EC: errorCode.ERROR_PARAMS,
        DT: "",
      };
    }
  }

  if (rawShopData.email) {
    const isEmailExist = await checkShopExist(rawShopData.email);
    if (isEmailExist) {
      return {
        EM: "Email already exist",
        EC: errorCode.ERROR_PARAMS,
        DT: "",
      };
    }
  }

  try {
    await db.Shop.update(
      {
        slug: rawShopData.slug,
      },
      { where: { id: rawShopData.id } }
    );
    await db.Shop_Detail.update(
      {
        name: rawShopData.name,
        phone: rawShopData.phone,
        email: rawShopData.email,
        address: rawShopData.address,
        city: rawShopData.city,
        district: rawShopData.district,
        ward: rawShopData.ward,
        photo_url: rawShopData.photo_url,
      },
      { where: { shopID: rawShopData.id } }
    );
    return {
      EM: "Update shop successfully!",
      EC: errorCode.SUCCESS,
      DT: "",
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: shopService.js:277 ~ updateShopService ~ error:",
      error
    );
    return {
      EM: "Error from server shop service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

const banShopService = async (shopID) => {
  if (!shopID) {
    return {
      EM: "ID is required!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  const isShopExist = await checkShopExist(shopID);
  if (!isShopExist) {
    return {
      EM: "Shop doesn't exist!",
      EC: errorCode.ERROR_PARAMS,
      DT: "",
    };
  }
  try {
    await db.Shop.update(
      {
        id_status: statusShop.BAN,
      },
      { where: { id: shopID } }
    );
    return {
      EM: "Ban shop successfully!",
      EC: errorCode.SUCCESS,
      DT: "",
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: shopService.js:123 ~ readSingleShopService ~ error:",
      error
    );
    return {
      EM: "Error from server shop service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    };
  }
};

module.exports = {
  createShopService,
  readAllShopService,
  readSingleShopeService,
  updateShopService,
  banShopService,
};
