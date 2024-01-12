const sequelize = require("../Connection.js");
const { DataTypes} = require("sequelize");

const orders = sequelize.define(
  "orders",
  {
    numOrder: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    orderDate: {
      type: DataTypes.DATEONLY,
    },
    orderTime: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["pending", "cancelled", "shipped", "completed"]],
      },
      defaultValue: "pending",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  orders
}