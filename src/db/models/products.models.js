const sequelize = require("../Connection.js");
const { DataTypes } = require("sequelize");


const products = sequelize.define(
    "tbl_products",
    {
      product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      product_price: DataTypes.DECIMAL,
      estado: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["available", "Sold out"]],
        },
        defaultValue: "available",
      },
    },
    {
      timestamps: false,
    }
);

module.exports = {
  products

}