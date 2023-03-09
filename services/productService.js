const productDao = require("../models/productDao");

const productsInqury = async (categoryId) => {
  const showProducts = await productDao.showProducts(categoryId);
  return showProducts;
};

module.exports = {
  productsInqury,
};
