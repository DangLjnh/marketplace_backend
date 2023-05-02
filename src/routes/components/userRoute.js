const express = require("express");
const router = express.Router();

import userController from "../../controller/userController";
import { checkUserJwt } from "../../middleware/JwtAction";
import authController from "../../controller/authController";

// router.get("/", userController.createUser);

// auth route
router.post("/auth/login", authController.loginUser);
router.post("/auth/register", authController.registerUser);
router.post("/auth/verify-token", authController.verifyToken);
router.get("/auth/account", checkUserJwt, userController.readUserAccount);

// user route
router.get("/user/read-all", userController.readAllUser);
router.get("/user/read-single/:id=?", userController.readSingleUser);
router.get("/user/ban/:id=?", userController.banUser);
router.put("/user/update", userController.updateUser);
// router.delete("/user/delete", userController.getUserAccount);

module.exports = router;
