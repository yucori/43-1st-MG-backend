const productService = require("../services/productService");
const { catchAsync } = require("../utils/error");

const productsInqury = catchAsync(async (req, res) => {
  let { categoryId, limit, offset } = req.query;

  limit = parseInt(limit);
  offset = parseInt(offset);

  if (!categoryId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const productsInqury = await productService.productsInqury(
    categoryId,
    limit,
    offset
  );

  return res.status(200).json({
    data: productsInqury,
  });
});

const createProduct = async (req, res) => {
  try {
    const { productName, stock, price, thumbnail, categoryId } = req.body;

    if (!productName || !stock || !price || !thumbnail || !categoryId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await productService.createProduct(
      productName,
      stock,
      price,
      thumbnail,
      categoryId
    );
    return res.status(201).json({
      message: "PRODUCTS_CREATED",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  productsInqury,
  createProduct,
};
