const { appDataSource } = require("./data-source");

const showProducts = async (categoryId) => {
  try {
    let query = `SELECT
            products.id AS products_id,
            products.name AS products_name,
            products.price,
            products.thumbnail,
            products.category_id,
            categories.name AS category_name
          FROM products
          JOIN categories ON products.category_id = categories.id`;
    if (categoryId !== "0") {
      query += `Where products_id = ?`;
      return await appDataSource.query(query, [categoryId]);
    } else {
      return await appDataSource.query(query);
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
//limit offset
