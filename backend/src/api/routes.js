const Router = require('express');
const {
  RegisterCustomer, LoginCustomer,
} = require('../controllers/CustomerController');

const routes = Router();

routes.post('/login', LoginCustomer);

routes.post('/register', RegisterCustomer);

module.exports = routes;
