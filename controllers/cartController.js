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

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  
  if (!productId || !quantity) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  await cartService.createCart(userId, productId, quantity)
  
  return res.status(201).send({
    message:"CREATE_CART",
    userId : userId,
    productId: productId
  })
})

const updateCart = catchAsync(async(req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  await cartService.updateCart(userId, productId, quantity)
  return res.status(200).send({
    message:"UPDATED_CART",
    userId : userId,
    productId : productId
  })
})

module.exports = {
  cartInfo,
  deleteInCart,
  deleteAllInCart,
  createCart,
  updateCart,
};
