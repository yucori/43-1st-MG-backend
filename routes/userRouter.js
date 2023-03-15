const express = require("express");
const userController = require("../controllers/userController");
const { loginRequired } = require("../utils/auth");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.patch("/info", loginRequired, userController.updateUserInfo);
router.get("/cart", loginRequired, userController.cartInfo);
router.get("/cart/delete", loginRequired, userController.deleteInCart);
router.get("/cart/deleteAll", loginRequired, userController.deleteAllInCart);

module.exports = {
  router,
};
