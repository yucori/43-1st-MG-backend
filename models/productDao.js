const { appDataSource } = require("./data-source");

const showProducts = async (categoryId) => {
  try {
    return await appDataSource.query(
      `SELECT
          products.id AS products_id,
          products.name AS products_name,
          products.price,
          products.thumbnail,
          products.category_id,
          categories.name AS category_name
        FROM products
        JOIN categories ON products.category_id = categories.id
        WHERE products.category_id = ?
      `,
      [categoryId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  showProducts,
};
//limit offset
