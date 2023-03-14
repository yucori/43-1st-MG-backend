const { appDataSource } = require('./data-source')

const createIntoCart = async(userId) => {
  const result = await appDataSource.query(`
    INSERT INTO cart(user_id, product_id, quantity)
     VALUES (?,?,?) 
  `,[user_id. product_id, quantity]
  );
  return result.insertId
}
 

module.exports = {
  createIntoCart
}