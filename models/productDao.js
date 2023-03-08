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

const showAllProducts = async () => {
  try {
    return await appDataSource.query(
      `SELECT *
        FROM products
      `
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
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

const updateProduct = async (
  productId,
  productName,
  stock,
  price,
  thumbnail,
  categoryId
) => {
  try {
    console.log(stock);
    await appDataSource.query(
      `UPDATE products
          SET
          name = ?,
          stock = ?,
          price = ?,
          thumbnail = ?,
          category_id = ?
        WHERE id = ?
      `,
      [productName, stock, price, thumbnail, categoryId, productId]
    );

    const result = await appDataSource.query(
      `SELECT *
        FROM products
        WHERE id = ?
      `,
      [productId]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUTT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  showProducts,
  showAllProducts,
  newProduct,
  updateProduct,
};
//limit offset
