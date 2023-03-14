const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("", productController.productsInqury);
router.get("/:productId", productController.productDetailInqury);
router.get("/categories/product-count", productController.categoryProductNum);

module.exports = {
  router,
};
