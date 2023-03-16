const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/error");

const cartInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const cart = await cartService.cartInfo(userId);

  return res.status(200).json({
    data: cart,
  });
});

module.exports = {
  cartInfo,
};
