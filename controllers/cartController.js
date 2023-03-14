const { catchAsync } = require('../utils/error')
const cartService = require('../services/cartService')

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  await cartService.getCartByUserId(userId)
  return res.status(200).json({message:"CREATE_CART"})

})

module.exports = {
  createCart
}