const productDao = require("../models/productDao");

const productsInqury = async (categoryId, limit, offset) => {
  const showProducts = await productDao.showProducts(categoryId, limit, offset);
  return showProducts;
};

module.exports = {
  productsInqury,
};
