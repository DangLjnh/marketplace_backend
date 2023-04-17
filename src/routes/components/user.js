const express = require("express");
const router = express.Router();
import userController from "../../controller/userController";

router.get("/", userController.createUser);

module.exports = router;
