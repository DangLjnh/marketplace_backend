const express = require("express");
const router = express.Router();

import productController from "../../controller/productController";

// router.get("/", userController.createUser);

// auth route
router.post("/product/search", productController.searchProduct);
// router.post("/auth/register", authController.registerUser);
// router.post("/auth/verify-token", authController.verifyToken);
// router.get("/auth/account", checkUserJwt, userController.readUserAccount);
// router.post("/auth/send-email", authController.sendEmail);
// router.post("/auth/send-otp", authController.sendCode);



module.exports = router;
