const productDao = require("../models/productDao");

const productsInqury = async (categoryId, limit, offset) => {
  return await productDao.showProducts(categoryId, limit, offset);
};

const categoryProductNum = async (categoryId) => {
  return await productDao.showProductNum(categoryId);
};

module.exports = {
  productsInqury,
  categoryProductNum,
};
