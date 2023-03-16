const express = require("express");
const cartController = require("../controllers/cartController");
const { loginRequired } = require("../utils/auth");
const router = express.Router();

router.get("", loginRequired, cartController.cartInfo);
router.get("/delete/:productId", loginRequired, cartController.deleteInCart);
router.get("/deleteAll", loginRequired, cartController.deleteAllInCart);

module.exports = {
  router,
};
