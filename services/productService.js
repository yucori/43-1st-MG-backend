const productDao = require("../models/productDao");

const productsInqury = async (categoryId) => {
  const showProducts = await productDao.showProducts(categoryId);
  return showProducts;
};

const allProducts = async () => {
  const showAllProducts = await productDao.showAllProducts();
  return showAllProducts;
};

const createProduct = async (
  productName,
  stock,
  price,
  thumbnail,
  categoryId
) => {
  const newProduct = await productDao.newProduct(
    productName,
    stock,
    price,
    thumbnail,
    categoryId
  );
  return newProduct;
};

const modifyProduct = async (
  productId,
  productName,
  stock,
  price,
  thumbnail,
  categoryId
) => {
  const updateProduct = await productDao.updateProduct(
    productId,
    productName,
    stock,
    price,
    thumbnail,
    categoryId
  );
  return updateProduct;
};

module.exports = {
  productsInqury,
  allProducts,
  createProduct,
  modifyProduct,
};
