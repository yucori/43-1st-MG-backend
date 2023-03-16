const cartDao = require("../models/cartDao");

const cartInfo = async (userId) => {
  return await cartDao.getCart(userId);
};

module.exports = {
  cartInfo,
};
