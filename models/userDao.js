const { appDataSource } = require('./data-source')

const createUser = async(userName, password, email, phoneNumber, address, birth, gender, point) => {
  const result = await appDataSource.query(`
    INSERT INTO users (
      name, 
      password, 
      email, 
      phone_number, 
      address, 
      birth, 
      gender,
      point
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [userName, password, email, phoneNumber, address, birth, gender, point]
  );
  return result.insertId
}


const getUserByEmail = async (email) => {
  const result = await appDataSource.query(`
    SELECT
      id,
      name, 
      password, 
      email, 
      phone_number, 
      address, 
      birth, 
      gender,
      point
    FROM users
    WHERE email=?`, [email]
  )
  return result[0]
}


module.exports = {
  createUser,
  getUserByEmail
}