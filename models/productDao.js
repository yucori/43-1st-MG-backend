const { appDataSource } = require("./data-source");

const showProducts = async (categoryId, limit, offset) => {
  try {
    let query = `SELECT
          products.id AS products_id,
          products.name AS products_name,
          products.price,
          products.thumbnail,
          products.category_id,
          categories.name AS category_name
        FROM products
        JOIN categories ON products.category_id = categories.id
        ORDER BY products.id DESC
      `;
    if (categoryId !== "0") {
      query += ` WHERE products.category_id = ?`;
    }
    query += ` LIMIT ? OFFSET ?`;
    if (categoryId !== "0") {
      return await appDataSource.query(query, [categoryId, limit, offset]);
    } else {
      return await appDataSource.query(query, [limit, offset]);
    }
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  showProducts,
};
