const { appDataSource } = require("./data-source");

const getCart = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
      cart.user_id as userId,
      users.name as userName,
      users.point as point,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "cartId", cart.id,
          "productId", cart.product_id,
          "productName", products.name,
          "quantity", cart.quantity,
          "productThumbnail", products.thumbnail,
          "price", products.price,
          "discountedPrice",
          CASE
            WHEN (cart.quantity BETWEEN 1 AND 4) THEN products.price
            WHEN (cart.quantity BETWEEN 5 AND 9) THEN 0.95*products.price
            WHEN (cart.quantity BETWEEN 10 AND 29) THEN 0.92*products.price
            WHEN (cart.quantity BETWEEN 30 AND 49) THEN 0.90*products.price
            WHEN (cart.quantity >= 50) THEN 0.87*products.price
          END
        )
      ) AS products
    FROM cart
    JOIN users ON users.id = cart.user_id
    JOIN products ON products.id = cart.product_id
    WHERE cart.user_id = ?
    GROUP BY cart.user_id, users.name, users.point
    `,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const deleteItem = async (userId, productId) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM cart
      WHERE user_id = ? AND product_id = ?
    `,
      [userId, productId]
    );
    if (result.affectedRows === 0) {
      const error = new Error("NO_ROWS_DELETED");
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    if (err.code === "ER_BAD_FIELD_ERROR") {
      const error = new Error("INVALID_DATA_INPUT");
      error.statusCode = 400;
      throw error;
    } else {
      throw err;
    }
  }
};

const deleteAllItem = async (userId) => {
  try {
    await appDataSource.query(
      `DELETE FROM cart
      WHERE user_id = ?
      `,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const createIntoCart = async(userId, productId, quantity) => {
  try{
    return await appDataSource.query(
      `
      INSERT INTO cart (user_id, product_id, quantity) 
      VALUES (?, ?, ?);
    `, [userId, productId, quantity]
    )
    
  }catch(err){
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const updateCart = async(userId, productId, quantity) => {
    return await appDataSource.query(
      `  
      UPDATE 
        cart 
      SET quantity = ? 
      WHERE 
        product_id = ? 
      AND 
        user_id = ?`
      , [quantity, productId, userId]
    );
}

const checkExistedCart= async(productId, userId) => {
  try {
      const [cart] = await appDataSource.query(
        `SELECT
          id,
          quantity
        FROM 
          cart
        WHERE
          product_id = ?
        AND
          user_id = ?
        `,
        [productId, userId]
      );
      return cart
    } catch (err) {
      console.log(err)
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }
}


module.exports = {
  getCart,
  deleteItem,
  deleteAllItem,
  createIntoCart,
  updateCart,
  checkExistedCart,
};
