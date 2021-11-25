require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const middlewares = require('../middlewares/error');
const ProductsController = require('../controllers/ProductsController');
const SellerController = require('../controllers/SellerController');
const SalesController = require('../controllers');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/customer', routes);

app.get('/products', ProductsController.getProducts);
app.get('/seller', SellerController.getSellers);
app.use('/sales', SalesController.sales);

app.use(middlewares);

module.exports = app;
