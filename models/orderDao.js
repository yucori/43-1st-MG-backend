const { appDataSource } = require("./data-source");

const orderCompleted = async (userId, orderNumber, totalPrice) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    let userPoint = await queryRunner.query(
      `SELECT point FROM users WHERE id = ?`,
      [userId]
    );
    userPoint = userPoint[0].point;

    if (totalPrice > userPoint) {
      const error = new Error("NEED_POINT_CHARGE");
      error.statusCode = 400;
      throw error;
    }

    const order_items = [];
    await queryRunner.query(
      `INSERT INTO orders(user_id, order_number, status_info_id)
         VALUES(?, ?, 1)`,
      [userId, orderNumber]
    );

    const result = await queryRunner.query(
      `SELECT orders.id, cart.product_id, cart.quantity
         FROM orders JOIN cart ON cart.user_id = orders.user_id
        WHERE orders.order_number = ?`,
      [orderNumber]
    );

    result.forEach((item) => {
      order_items.push([item.id, item.product_id, item.quantity]);
    });

    queryRunner.query(
      `INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`,
      [order_items]
    );

    const changePoint = userPoint - totalPrice;

    await queryRunner.query(`UPDATE users SET point = ? WHERE id = ?`, [
      changePoint,
      userId,
    ]);

    await queryRunner.query(`DELETE FROM cart WHERE user_id = ?`, [userId]);

    await queryRunner.commitTransaction();
  } catch (err) {
    if (err.code === "ER_BAD_FIELD_ERROR") {
      await queryRunner.rollbackTransaction();
      const error = new Error("INVLID_DATA_INPUT");
      error.statusCode = 400;
      throw err;
    } else {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }
};

module.exports = {
  orderCompleted,
};
