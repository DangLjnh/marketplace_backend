const express = require("express");
const router = express.Router();
import shopController from "../../controller/shopController";

import { checkUserJwt, checkUserPermission } from "../../middleware/JwtAction";

router.get("/shop/read-all", shopController.readAllShop);
router.get("/shop/read-single/:slug=?", shopController.readSingleShope);
router.post("/shop/create", shopController.createShop);
router.post("/shop/ban", shopController.banShop);
router.put("/shop/update", shopController.updateShop);
// router.delete("/shop/delete", shopController.readAllShop);

module.exports = router;
