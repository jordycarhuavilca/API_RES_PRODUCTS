const { Features } = require("../db/models/features.models");
const { Features_values } = require("../db/models/features_value.models");
const { orders } = require("../db/models/orders.models");
const { products } = require("../db/models/products.models");
const { users } = require("../db/models/user.models");
const { orderDetail } = require("../db/models/orderDetail.models");

users.hasMany(orders, { as: "Pedido", foreignKey: "document_Identity" });
orders.belongsTo(users, { as: "Pedido", foreignKey: "document_Identity" });

products.hasMany(orderDetail, { foreignKey: "product_id" });
orderDetail.belongsTo(products, { foreignKey: "product_id" });

orders.hasMany(orderDetail, { foreignKey: "numOrder" });
orderDetail.belongsTo(orders, { foreignKey: "numOrder" });

products.hasMany(Features_values, { foreignKey: "product_id" });
Features_values.belongsTo(products, { foreignKey: "product_id" });

Features.hasMany(Features_values, { foreignKey: "FeatureId" });
Features_values.belongsTo(Features, { foreignKey: "FeatureId" });

module.exports = {
  users,
  products,
  Features,
  Features_values,
  orders,
  orderDetail,
};
