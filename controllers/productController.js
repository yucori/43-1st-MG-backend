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

const categoryProductNum = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  const categoryProductNum = await productService.categoryProductNum(
    categoryId
  );
  return res.status(200).json({
    data: categoryProductNum,
  });
});

module.exports = {
  productsInqury,
  categoryProductNum,
};
