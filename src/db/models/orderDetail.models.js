const sequelize = require("../Connection.js");
const { DataTypes } = require("sequelize");

const orderDetail = sequelize.define(
  "orderDetail",
  {
    orderDetailId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
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
