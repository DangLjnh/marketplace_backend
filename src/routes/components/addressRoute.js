const express = require("express");
const router = express.Router();

import addressController from "../../controller/addressController";

// router.get("/", userController.createUser);

router.get("/user/address/read-all", addressController.readAllAddress);
router.post("/user/address/create", addressController.createAddress);
// router.get("/update", groupController.updateGroup);
// router.get("/delete", groupController.deleteGroup);

module.exports = router;
