const { appDataSource } = require("./data-source");

const showProducts = async (categoryId, limit, offset) => {
  try {
    let params = [];
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
      query += ` WHERE products.category_id = ?`;
      params.push(categoryId);
    }
    query += ` ORDER BY products.id DESC LIMIT ${limit} OFFSET ${offset}`;

    return await appDataSource.query(query, params);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const newProduct = async (productName, stock, price, thumbnail, categoryId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO products(
        name,
        stock,
        price,
        thumbnail,
        category_id
      )VALUES(?, ?, ?, ?, ?);
      `,
      [productName, stock, price, thumbnail, categoryId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  showProducts,
  newProduct,
};
