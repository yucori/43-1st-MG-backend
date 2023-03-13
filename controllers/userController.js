const userService = require('../services/userService')
const { catchAsync } = require('../utils/error')
const { emailValidator, passwordValidator } = require('../utils/validator')
const signUp = catchAsync(async (req, res) => {
  const { userName, password, email, phoneNumber, address, birth, gender, point} = req.body;
  
  if ( !userName || !password || !email || !phoneNumber || !address || !birth || !gender || point === undefined){
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  emailValidator(email);
  passwordValidator(password);
  await userService.signUp(userName, password, email, phoneNumber, address, birth, gender, point);
  res.status(201).json({ message: "SUCCESS" });
})


const signIn = catchAsync(async(req, res) => {
  const {email, password} = req.body;
  
    const accessToken = await userService.signIn(email, password)
    res.status(200).json({ accessToken })    
})


module.exports = {
  signUp,
  signIn
}