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

module.exports = {
  getCart,
};
