const orderDao = require("../models/orderDao");

const sendOrder = async (userId, totalPrice) => {
  const { v4 } = require("uuid");

  const uuid = () => {
    const tokens = v4().split("-");
    return tokens[2] + tokens[1] + tokens[0] + tokens[3];
  };
  const orderNumber = uuid();
  return await orderDao.orderCompleted(userId, orderNumber, totalPrice);
};

module.exports = {
  sendOrder,
};
