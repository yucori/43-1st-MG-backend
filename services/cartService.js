const cartDao = require("../models/cartDao");

const cartInfo = async (userId) => {
  return await cartDao.getCart(userId);
};

const deleteInCart = async (userId, productId) => {
  return await cartDao.deleteItem(userId, productId);
};

const deleteAllInCart = async (userId) => {
  return await cartDao.deleteAllItem(userId);
};

module.exports = {
  cartInfo,
  deleteInCart,
  deleteAllInCart,
};
