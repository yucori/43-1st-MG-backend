const { appDataSource } = require("./data-source");
const createUser = async (
  userName,
  password,
  email,
  phoneNumber,
  address,
  birth,
  gender,
  point
) => {
  const result = await appDataSource.query(
    `
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
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const result = await appDataSource.query(
    `
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
    WHERE email=?`,
    [email]
  );
  return result[0];
};

const getUserById = async (id) => {
  const result = await appDataSource.query(
    `
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
    WHERE id=?`,
    [id]
  );
  return result[0];
};

const updateUser = async (userId, password, phoneNumber, address) => {
  try {
    await appDataSource.query(
      `
    UPDATE
      users
    SET
      password=?,
      phone_number=?,
      address=?
    WHERE id=?
    `,
      [password, phoneNumber, address, userId]
    );

    const result = await appDataSource.query(
      `SELECT *
        FROM users
        WHERE id=?
      `,
      [userId]
    );

    return result;
  } catch (err) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
};

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

const orderCompleted = async (userId, orderNumber) => {
  try {
    const order_items = [];
    await appDataSource.query(
      `INSERT INTO orders(user_id, order_number, address_id, status_info_id)
         VALUES(?, ?, 1, 1)`,
      [userId, orderNumber]
    );

    const result = await appDataSource.query(
      `SELECT orders.id, cart.product_id, cart.quantity
      FROM orders
      JOIN cart ON cart.user_id = orders.user_id
      WHERE orders.order_number = ?
      `,
      [orderNumber]
    );

    result.forEach((item) => {
      order_items.push([item.id, item.product_id, item.quantity]);
    });

    appDataSource.query(
      `INSERT INTO order_items
        (order_id, product_id, quantity)
        VALUES ?`,
      [order_items]
    );

    await appDataSource.query(
      `DELETE FROM cart 
      WHERE user_id = ?`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  getCart,
  orderCompleted,
};
