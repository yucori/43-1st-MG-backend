const { appDataSource } = require("./data-source");

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
  orderCompleted,
};
