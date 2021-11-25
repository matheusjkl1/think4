const rescue = require('express-rescue');
const productService = require('../services/ProductService');
const { OK, NOT_FOUND } = require('../utils/statusCode');

const getProducts = (rescue(async (_req, res, next) => {
  const serviceResponse = await productService.getProducts();
  if (!serviceResponse) {
    return next({
      statusCode: NOT_FOUND,
      message: 'Not Found Products',
    });
  }
  return res.status(OK).json(serviceResponse);
}));

module.exports = {
  getProducts,
};
