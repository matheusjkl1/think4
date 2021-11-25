module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    urlImage: DataTypes.STRING,
  }, { tableName: 'products', timestamps: false, underscored: true });

  return Product;
};
