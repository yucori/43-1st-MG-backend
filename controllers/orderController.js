const orderService = require("../services/orderService");
const { catchAsync } = require("../utils/error");

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { totalPrice } = req.body;

  await orderService.createOrder(userId, totalPrice);

  return res.status(201).json({
    message: "ORDER_COMPLETED",
  });
});

module.exports = {
  createOrder,
};
