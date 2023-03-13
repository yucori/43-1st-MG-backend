const productDao = require("../models/productDao");

const productsInqury = async (categoryId, limit, offset) => {
  return await productDao.showProducts(categoryId, limit, offset);
};

module.exports = {
  productsInqury,
};
