const { appDataSource } = require('./data-source')

const getCartById = async(userId) => {
  const cart = await appDataSource.query(`
    SELECT 
      cart.id AS cart_id,
      products.id AS products_id,
      cart.quantity,
      products.name AS products_name,
    FROM
      cart, products
    AND 
      user_id =?

  `)
}
