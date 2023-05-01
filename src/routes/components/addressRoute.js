const express = require("express");
const router = express.Router();

import addressController from "../../controller/addressController";

// router.get("/", userController.createUser);

router.get("/user/address/read-all", addressController.readAllAddress);
router.post("/user/address/create", addressController.createAddress);
router.put("/user/address/update", addressController.updateAddress);
router.delete("/user/address/delete", addressController.deleteAddress);

module.exports = router;
