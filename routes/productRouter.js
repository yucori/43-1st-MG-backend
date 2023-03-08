const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/:categoryId", productController.productsInqury);
router.get("", productController.allProducts);
router.post("", productController.createProduct);
router.patch("/:productId", productController.modifyProduct);
//router.delete("/:productId", productController.deletePost);

module.exports = {
  router,
};
