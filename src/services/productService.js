import { Op } from "sequelize";
import db from "../models";
import {  errorCode } from "../status/status";


const searchProductService = async (name) => {
  try {
    // Assuming you have a 'User' model with a 'name' attribute
    const results = await db.Product.findAll({
      where: db.sequelize.literal(`name COLLATE utf8_general_ci LIKE '%${name}%'`),
    });
    // Process the search results
    return {
      EM: "Search product successfully",
      EC: errorCode.SUCCESS,
      DT: results,
    };
  } catch (error) {
    console.log("🚀 ~ file: productService.js:23 ~ searchProductService ~ error:", error)
    return {
      EM: "Error from server product service!",
      EC: errorCode.ERROR_SERVER,
      DT: "",
    }
  }
};

module.exports = {
  searchProductService,
};
