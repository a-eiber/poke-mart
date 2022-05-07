const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const OrderProducts = require('./models/OrderProducts');
const Order = require('./models/Order');

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: 'OrderProducts' });
Product.belongsToMany(Order, { through: 'OrderProducts' });
Order.hasMany(OrderProducts);
OrderProducts.belongsTo(Order);
Product.hasMany(OrderProducts);
OrderProducts.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderProducts,
    Order,
  },
};
