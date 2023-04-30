const express = require("express");
const router = express.Router();

import roleController from "../../controller/roleController";

// router.get("/", userController.createUser);

router.get("/role/read-all", roleController.readAllRole);
router.post("/role/create", roleController.createRole);
// router.get("/update", groupController.updateGroup);
router.delete("/role/delete", roleController.deleteRole);

module.exports = router;
