const express = require("express");
const router = express.Router();
import groupController from "../../controller/groupController";

import { checkUserJwt, checkUserPermission } from "../../middleware/JwtAction";

router.get("/group/read-all", groupController.readAllGroup);
router.post("/group/create", groupController.createGroup);
router.put("/group/update", groupController.updateGroup);
router.delete("/group/delete", groupController.deleteGroup);

module.exports = router;
