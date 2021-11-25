const { Op } = require('sequelize');
const {
  Sale, SalesProduct, Product, User,
} = require('../database/models');

const checkoutNewSale = async (data, productCart) => {
  if (!data || !productCart) return { error: 'bad_request' };

  const newSale = await Sale.create(data);

  const products = [];

  productCart.forEach((item) => products.push(Product.findOne({ where: { name: item.name } })));

  const productList = await Promise.all(products);
  productList.forEach(({ id, stock }, index) => Product.update({
    stock: stock - productCart[index].quantity,
  }, { where: { id } }));

  productList.forEach(({ id }, index) => SalesProduct.create({
    saleId: newSale.id, productId: id, quantity: productCart[index].quantity,
  }));

  return newSale;
};

const getSales = async (id) => {
  const sales = await Sale.findAll({
    where: { [Op.or]: [{ userId: id }, { sellerId: id }] },
    include: [{ model: Product, as: 'products' }],
  });
  return sales;
};

const getSale = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: [{ model: Product, as: 'products' }],
  });

  const seller = await User.findByPk(sale.sellerId);

  return { sale, seller };
};

const statusUpdate = async (id, status) => Sale.update({ status }, { where: { id } });

module.exports = {
  checkoutNewSale,
  getSales,
  getSale,
  statusUpdate,
};
