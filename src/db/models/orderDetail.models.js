const sequelize = require("../Connection.js");
const { DataTypes } = require("sequelize");

const orderDetail = sequelize.define(
  "orderDetail",
  {
    orderDetailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull : false
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  orderDetail,
};
