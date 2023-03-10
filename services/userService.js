const bcrypt = require('bcrypt')

const userDao  = require('../models/userDao')
const { emailValidator, passwordValidator } = require('../utils/validator')


const hashPassword = async ( plaintextPassword ) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds)

  return await bcrypt.hash(plaintextPassword, salt);
}


const signUp = async( userName, password, email, phoneNumber, address, birth, gender, point ) => {
  emailValidator(email);
  passwordValidator(password);
  
  const hashedPassword = await hashPassword(password)

  return userDao.createUser( userName, hashedPassword, email, phoneNumber, address, birth, gender, point )
}


module.exports = {
  signUp,
}