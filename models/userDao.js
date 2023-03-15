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
      password,
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

const createIntoCart = async(userId, productId, quantity) => {
  try{
    return await appDataSource.query(
    `
      INSERT INTO cart (user_id, product_id, quantity) 
      VALUES (?, ?, ?);
    `,
    [userId, productId, quantity]
    );
  }catch(err){
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};



const updateCart = async(userId, productId, cartId, quantity) => {
  try {
      return await appDataSource.query(
        `
        UPDATE
          cart
        SET
          quantity=?
        WHERE
          products_id=?
        AND 
          user_id=?
        AND 
          id=?  
        `
        [userId, productId, cartId, quantity]
      );
    }catch(err){
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }
}

const checkExistedCart= async(productId, userId) => {
  const result = await appDataSource.query(
    `
    SELECT
      c.id As cartId,
      p.id As productsId,
      u.id AS userId
    FROM 
      cart
    WHERE
      products_id=?
    AND 
      user_id=?
    `,
    [productId, userId]
  );
  return result;    
}


const updateQuantityTheCart = async(quantity, productId, userId, cartId) => {
  const result = await appDataSource.query(
    `
      UPDATE 
        cart
      SET 
        quantity=?
      WHERE 
        product_id=?
      AND 
        user_id=?
      AND
        id=?        
    `,
    [quantity, productId, userId, cartId]
  );
  return result;
}


const deleteAllCart = async(userId) => {
  await appDataSource.query(
    `
    DELETE *
    FROM cart
    WHERE user_id=?
    `,
    [userId]
  )

}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  createIntoCart,
  updateCart,
  checkExistedCart,
  updateQuantityTheCart,
  deleteAllCart
}