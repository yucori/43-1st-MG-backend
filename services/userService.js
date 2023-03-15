const bcrypt = require('bcrypt')
const userDao  = require('../models/userDao')
const jwt = require('jsonwebtoken')

const hashPassword = async ( plaintextPassword ) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds)

  return await bcrypt.hash(plaintextPassword, salt);
}

const signUp = async( userName, password, email, phoneNumber, address, birth, gender, point ) => {
  const hashedPassword = await hashPassword(password)

  return userDao.createUser(userName, hashedPassword, email, phoneNumber, address, birth, gender, point)
}


const signIn = async( email, password ) => { 
  const user = await userDao.getUserByEmail(email);

  if(!user){
    const error = new Error('INVALID_USER')
    error.statusCode = 401;

    throw error;
  }
  const match = await bcrypt.compare(password, user.password);

  if(!match){
    const error = new Error('INVALID_USER')
    error.statusCode = 401;

    throw error;
  }

  const accessToken = jwt.sign({ id : user.id }, process.env.JWT_SECRET,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  )
 return accessToken;
}

const updatedUserInfo = async ( userId, password, phoneNumber, address) => {
  return await userDao.updateUser(
    userId,
    password, 
    phoneNumber,
    address
  );
}

const createCart = async(userId, productId, quantity) => {
  return await userDao.createIntoCart(userId, productId, quantity)
}; 


const updateCart = async(cartId, productId, userId, quantity) => {
  await userDao.updateCart(userId,productId, cartId, quantity)
}

const deleteAllCart = async(userId) => {
  await userDao.deleteAllCart(userId)
}

module.exports = {
  signUp,
  signIn,
  updatedUserInfo,
  createCart,
  updateCart,
  deleteAllCart
}