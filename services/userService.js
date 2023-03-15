const bcrypt = require("bcrypt");
const userDao = require("../models/userDao");
const jwt = require("jsonwebtoken");

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(plaintextPassword, salt);
};

const signUp = async (
  userName,
  password,
  email,
  phoneNumber,
  address,
  birth,
  gender,
  point
) => {
  const hashedPassword = await hashPassword(password);

  return userDao.createUser(
    userName,
    hashedPassword,
    email,
    phoneNumber,
    address,
    birth,
    gender,
    point
  );
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return accessToken;
};

const updatedUserInfo = async (userId, password, phoneNumber, address) => {
  return await userDao.updateUser(userId, password, phoneNumber, address);
};

const cartInfo = async (userId) => {
  return await userDao.getCart(userId);
};

const sendOrder = async (userId) => {
  const { v4 } = require("uuid");

  const uuid = () => {
    const tokens = v4().split("-");
    return tokens[2] + tokens[1] + tokens[0] + tokens[3];
  };
  const orderNumber = uuid();
  return await userDao.orderCompleted(userId, orderNumber);
};

module.exports = {
  signUp,
  signIn,
  updatedUserInfo,
  cartInfo,
  sendOrder,
};
