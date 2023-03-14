const productDao = require("../models/productDao");

const productsInqury = async (categoryId, limit, offset) => {
  return await productDao.showProducts(categoryId, limit, offset);
};

const productDetailInqury = async (productId) => {
  return await productDao.showProductDetail(productId);
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

module.exports = {
  productsInqury,
  createProduct,
  productDetailInqury,
};
