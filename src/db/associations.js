const { users, orders, products, sequelize } = require("./models/index.models");

users.hasMany(orders, { as: "Pedido", foreignKey: "document_Identity" });
orders.belongsTo(users, { as: "Pedido", foreignKey: "document_Identity" });

products.hasMany(orders, { as: "Producto", foreignKey: "product_id" });
orders.belongsTo(products, { as: "Producto", foreignKey: "product_id" });

module.exports = sequelize;
