const express = require("express");
const router = express.Router();

import roleController from "../../controller/roleController";

// router.get("/", userController.createUser);

// router.get("/read", groupController.readGroup);
router.get("/create", roleController.createRole);
// router.get("/update", groupController.updateGroup);
// router.get("/delete", groupController.deleteGroup);

module.exports = router;
