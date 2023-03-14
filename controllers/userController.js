const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");
const { emailValidator, passwordValidator } = require("../utils/validator");

const signUp = catchAsync(async (req, res) => {
  const {
    userName,
    password,
    passwordConfirm,
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

  if (password != passwordConfirm) {
    return res.status(400).json({ message: "PASSWORD_UNMATCHED" });
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

module.exports = {
  signUp,
};
