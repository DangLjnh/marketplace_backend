const express = require("express");
const router = express.Router();

router.post("/bill/send-bill", authController.loginUser);
