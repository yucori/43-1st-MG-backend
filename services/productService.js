const productDao = require("../models/productDao");

const productsInqury = async (categoryId, limit, offset) => {
  return await productDao.showProducts(categoryId, limit, offset);
};

const productDetailInqury = async (productId) => {
  return await productDao.showProductDetail(productId);
};

const categoryProductNum = async () => {
  return await productDao.showProductNum();
};

module.exports = {
  productsInqury,
  categoryProductNum,
  productDetailInqury,
};
