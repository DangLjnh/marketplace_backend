const express = require("express");
const router = express.Router();

import userController from "../../controller/userController";
import { checkUserJwt } from "../../middleware/JwtAction";
import authController from "../../controller/authController";

// router.get("/", userController.createUser);

router.post("/auth/login", authController.loginUser);
router.post("/auth/register", authController.registerUser);
router.post("/auth/verify-token", authController.verifyToken);
router.get("/auth/account", checkUserJwt, userController.getUserAccount);

module.exports = router;
