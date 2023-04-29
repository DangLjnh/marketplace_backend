const express = require("express");
const router = express.Router();

import userController from "../../controller/userController";
import { checkUserJwt } from "../../middleware/JwtAction";
import authController from "../../controller/authController";

// router.get("/", userController.createUser);

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post("/verify-token", authController.verifyToken);
router.get("/account", checkUserJwt, userController.getUserAccount);

module.exports = router;
