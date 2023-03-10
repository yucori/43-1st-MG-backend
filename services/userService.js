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
    const error = new Error('WRONG_EMAIL')
    error.statusCode = 401;

    throw error;
  }
  const match = await bcrypt.compare(password, user.password);

  if(!match){
    const error = new Error('WRONG_PASSWORD')
    error.statusCode = 401;

    throw error;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  )
 return accessToken;
}


module.exports = {
  signUp,
  signIn
}