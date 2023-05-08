const express = require("express");
const router = express.Router();
import { checkUserJwt, checkUserPermission } from "../../middleware/JwtAction";
import addressController from "../../controller/addressController";

// router.get("/", userController.createUser);

router.get(
  "/user/address/read-all/:userID=?",
  addressController.readAllAddressOfUser
);
router.get(
  "/user/address/read-single/:id=?",
  addressController.readSingleAddress
);
router.post("/user/address/create", addressController.createAddress);
router.put("/user/address/update-default", addressController.defaultAddress);
router.put("/user/address/update", addressController.updateAddress);
router.delete("/user/address/delete/:id=?", addressController.deleteAddress);

module.exports = router;
