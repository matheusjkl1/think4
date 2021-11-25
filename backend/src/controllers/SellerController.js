const rescue = require('express-rescue');
const SellerController = require('../services/SellerService');
const { NOT_FOUND, OK } = require('../utils/statusCode');

const getSellers = (rescue(async (_req, res, next) => {
  const serviceResponse = await SellerController.findSeller();
  if (!serviceResponse) {
    return next({
      statusCode: NOT_FOUND,
      message: 'Seller Not Found',
    });
  }
  return res.status(OK).json(serviceResponse);
}));

module.exports = {
  getSellers,
};
