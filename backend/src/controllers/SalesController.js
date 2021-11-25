const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const service = require('../services/SalesService');
const validateJwt = require('../middlewares/validateJwt');
const {
  OK, CREATED, NOT_FOUND, BAD_REQUEST,
} = require('../utils/statusCode');

router.post('/', [
  validateJwt,
  rescue(async (req, res, next) => {
    if (!req.body) {
      return next({
        statusCode: NOT_FOUND,
        message: 'Sales Not Found',
      });
    }

    const {
      sellerId, totalPrice, deliveryAddress, deliveryNumber, productCart,
    } = req.body;

    const userId = req.user;
    const status = 'Pendente';

    const saleDate = new Date();

    const sale = await service.checkoutNewSale({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
      saleDate,
    }, productCart);

    if (!sale) {
      return next({
        statusCode: BAD_REQUEST,
        message: 'Bad Request',
      });
    }

    if (sale.error) {
      return next({
        statusCode: BAD_REQUEST,
        message: sale.error,
      });
    }

    return res.status(CREATED).json(sale);
  }),
]);

router.get('/', [
  validateJwt,
  rescue(async (req, res, next) => {
    const userId = req.user;
    const response = await service.getSales(userId);
    if (!response.length) {
      return next({ statusCode: NOT_FOUND, message: 'Sales not found' });
    }
    return res.status(OK).json(response);
  }),
]);

module.exports = router;
