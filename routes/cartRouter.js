const express = require("express");
const cartController = require("../controllers/cartController");
const { loginRequired } = require("../utils/auth");
const router = express.Router();

router.get("", loginRequired, cartController.cartInfo);

module.exports = {
  router,
};
