const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("", productController.productsInqury);
router.get("/categories/:categoryId", productController.categoryProductNum);

module.exports = {
  router,
};
