const express = require("express");
const router = express.Router();
import groupController from "../../controller/groupController";

import { checkUserJwt } from "../../middleware/JwtAction";

// router.get("/read", groupController.readGroup);
router.get("/create", groupController.createGroup);
// router.get("/update", groupController.updateGroup);
// router.get("/delete", groupController.deleteGroup);

module.exports = router;
