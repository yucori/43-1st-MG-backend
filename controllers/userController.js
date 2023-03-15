const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");
const { emailValidator, passwordValidator } = require("../utils/validator");

const signUp = catchAsync(async (req, res) => {
  const {
    userName,
    password,
    email,
    phoneNumber,
    address,
    birth,
    gender,
    point,
  } = req.body;

  if (
    !userName ||
    !password ||
    !email ||
    !phoneNumber ||
    !address ||
    !birth ||
    !gender ||
    point === undefined
  ) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  

  emailValidator(email);
  passwordValidator(password);
  await userService.signUp(
    userName,
    password,
    email,
    phoneNumber,
    address,
    birth,
    gender,
    point
  );
  res.status(201).json({ message: "SUCCESS" });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const accessToken = await userService.signIn(email, password);
  res.status(200).json({ accessToken });
});

const updateUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { password, phoneNumber, address} = req.body;

    if(!password || !phoneNumber || !address) {
      const error = new Error('KEY_ERROR')
      error.statusCode = 400;
  
      throw error;
    }
    await userService.updatedUserInfo(
      userId,
      password,
      phoneNumber,
      address
    );
    return res.status(200).json({ message:"UPDATE USER INFO"})
  }
)

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  await userService.createCart(userId, productId, quantity)
  
  return res.status(201).send({
    message:"CREATE_CART",
    userId : userId,
    productId: productId
  })
})


module.exports = {
  signUp,
  signIn,
  updateUserInfo,
  createCart,
}
