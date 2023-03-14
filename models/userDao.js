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

const getUserById = async (id) => {
  const result = await appDataSource.query(`
    SELECT
      id,
      name, 
      password, email
      email, 
      phone_number, 
      address, 
      birth, 
      gender,
      point
    FROM users
    WHERE id=?`, [id]
  )
  return result[0]
}


const updateUser = async ( userId, password, phoneNumber, address ) => {
  try {
    await appDataSource.query(`
    UPDATE
      users
    SET
      password=?,
      phone_number=?,
      address=?
    WHERE id=?
    `,
    [ password, phoneNumber, address, userId]
  );

    const result = await appDataSource.query(
      `SELECT *
        FROM users
        WHERE id=?
      `,
      [userId]
    );

    return result;
  }catch(err) {
    const error = new Error('KEY ERROR')
    error.statusCode = 400;
    throw error;
  }
} 


module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser
}