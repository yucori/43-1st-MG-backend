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

const createCart = async(userId, productId, quantity) => {
  const cart = await cartDao.checkExistedCart(
    productId,
    userId
  )

  if(!cart) {
    return await cartDao.createIntoCart(userId, productId, quantity)
  }

  return await cartDao.updateCart(
    cart.quantity + quantity,
    productId,
    userId,
  )
}; 

const updateCart = async(userId, productId, quantity) => {
  return await cartDao.updateCart(userId, productId, quantity)
}


module.exports = {
  cartInfo,
  deleteInCart,
  deleteAllInCart,
  createCart,
  updateCart,
};
