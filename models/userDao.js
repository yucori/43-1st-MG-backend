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

const getUserByPhoneNumber = async (phoneNumber) => {
  try{
    const result = await appDataSource.query(`
    SELECT
      id
    FROM users
    WHERE phone_number=?`, [phoneNumber]
  )
  return result[0]
  }catch (err) {
    const error = new Error(“INVALID_DATA_INPUT”);
    error.statusCode = 400;
    throw error;
  }
}


const updateUser = async (password, phoneNumber, address) => {
  await appDataSource.query(`
    UPDATE 
      users
    SET 
      password=?,
      phone_number=?,
      address=?
      WHERE id=?
      `,
      [password, phoneNumber, address]
  );
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByPhoneNumber,
  updateUser
}