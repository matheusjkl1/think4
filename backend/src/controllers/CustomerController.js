const rescue = require('express-rescue');

const {
  CREATED, OK, NOT_FOUND, BAD_REQUEST, CONFLICT,
} = require('../utils/statusCode');
const {
  registerCustomer,
  loginCustomer,
  getCostumerById,
} = require('../services/CustomerService');

const RegisterCustomer = (rescue(async (req, res, next) => {
  const customer = await registerCustomer(req.body);
  if (!customer) {
    return next({
      statusCode: BAD_REQUEST,
      message: 'error_when_registering',
    });
  }

  if (customer.error === 'already_registered_user') {
    return next({
      statusCode: CONFLICT,
      message: customer.error,
    });
  }

  if (customer.error) {
    return next({
      statusCode: CONFLICT,
      message: customer.error,
    });
  }

  return res.status(CREATED).json(customer);
}));

const FindCostumerById = (rescue(async (req, res, next) => {
  const { id } = req.params;
  const customer = await getCostumerById(id);

  if (!customer) {
    return next({
      statusCode: NOT_FOUND,
      message: 'not_found',
    });
  }

  return res.status(OK).json(customer);
}));

const LoginCustomer = (rescue(async (req, res, next) => {
  const customer = await loginCustomer(req.body);

  if (customer.error) {
    return next({
      statusCode: NOT_FOUND,
      message: 'not_found',
    });
  }

  return res.status(OK).json(customer);
}));

module.exports = {
  RegisterCustomer,
  LoginCustomer,
  FindCostumerById,
};
