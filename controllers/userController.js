const userService = require('../services/userService')
const { catchAsync } = require('../utils/error')


const signUp = catchAsync(async (req, res) => {
  const { userName, password, passwordConfirm, email, phoneNumber, address, birth, gender, point} = req.body;
  
  if ( !userName || !password || !email || !phoneNumber || !address || !birth || !gender || point === undefined){
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  const insertId = await userService.signUp(userName, password, email, phoneNumber, address, birth, gender, point);
  res.status(201).json({ insertId });

})


const userUpdate = catchAsync(async (req, res) => {
  const { password, phoneNumber, address } = req.body;

  await userService.updateUserInfo( password, phoneNumber, address );
  return res.status(200).json({ message: " UPDATED USER INFORMATION "})
})


module.exports = {
  signUp
}