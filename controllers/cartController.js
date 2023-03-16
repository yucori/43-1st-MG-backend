const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/error");

const cartInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const cart = await cartService.cartInfo(userId);

  return res.status(200).json({
    data: cart,
  });
});

const deleteInCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.query;

  await cartService.deleteInCart(userId, productId);

  return res.status(200).json({
    message: "item_deleted_in_cart",
  });
});

const deleteAllInCart = catchAsync(async (req, res) => {
  const userId = req.user.id;

  await cartService.deleteAllInCart(userId);

  return res.status(200).json({
    message: "cart_is_empty_now",
  });
});

module.exports = {
  cartInfo,
  deleteInCart,
  deleteAllInCart,
};
