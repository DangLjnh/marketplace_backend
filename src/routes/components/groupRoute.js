const express = require("express");
const router = express.Router();
import groupController from "../../controller/groupController";

import { checkUserJwt, checkUserPermission } from "../../middleware/JwtAction";

router.get(
  "/group/read-all",
  checkUserJwt,
  checkUserPermission,
  groupController.readAllGroup
);
router.post("/group/create", checkUserJwt, groupController.createGroup);
// router.get("/update", groupController.updateGroup);
// router.get("/delete", groupController.deleteGroup);

module.exports = router;
