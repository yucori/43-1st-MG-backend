const express = require("express");
const cartController = require("../controllers/cartController");
const { loginRequired } = require("../utils/auth");
const router = express.Router();

router.get("", loginRequired, cartController.cartInfo);
router.delete("", loginRequired, cartController.deleteInCart);
router.delete("/all", loginRequired, cartController.deleteAllInCart);

module.exports = {
  router,
};
