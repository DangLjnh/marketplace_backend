import db from "../models";
const Sequelize = require("sequelize");

const getAllUser = async () => {
  let datas = [];
  datas = await db.Location.findAll();
  console.log("🚀 ~ file:zz userService.js:7 ~ getAllUser ~ datas:", datas);
  return {
    EM: "Hello world",
    EC: 0,
    DT: datas,
  };
};

module.exports = {
  getAllUser,
};
