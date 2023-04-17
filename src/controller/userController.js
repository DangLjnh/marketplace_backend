import userService from "../services/userService";

const createUser = async (req, res) => {
  let data = await userService.getAllUser();
  return res.status(200).json({
    EM: data.EM, // error message
    EC: data.EC, //error code
    DT: data.DT, //data
  });
};

module.exports = { createUser };
