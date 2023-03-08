const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/:categoryId", productController.productsInqury);

module.exports = {
  router,
};
