const orderDao = require("../models/orderDao");
const { v4 } = require("uuid");

const createOrder = async (userId, totalPrice) => {
  const orderNumber = v4();
  return await orderDao.orderCompleted(userId, orderNumber, totalPrice);
};

module.exports = {
  createOrder,
};
