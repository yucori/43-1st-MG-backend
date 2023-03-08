const productService = require("../services/productService");

const productsInqury = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const productsInqury = await productService.productsInqury(categoryId);
    return res.status(200).json({
      data: productsInqury,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const allProducts = async (req, res) => {
  try {
    const allProducts = await productService.allProducts();
    return res.status(200).json({
      data: allProducts,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { productName, stock, price, thumbnail, categoryId } = req.body;

    if (!productName || !stock || !price || !thumbnail || !categoryId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await productService.createProduct(
      productName,
      stock,
      price,
      thumbnail,
      categoryId
    );
    return res.status(201).json({
      message: "PRODUCTS_CREATED",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const modifyProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, stock, price, thumbnail, categoryId } = req.body;

    const modifyProduct = await productService.modifyProduct(
      productId,
      productName,
      stock,
      price,
      thumbnail,
      categoryId
    );
    return res.status(200).json({
      data: modifyProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  productsInqury,
  allProducts,
  createProduct,
  modifyProduct,
};
