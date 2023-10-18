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

const orders = sequelize.define(
  "orders",
  {
    numOrder: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.DECIMAL,
    },
    estado: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["pending", "cancelled", "shipped", "completed"]],
      },
      defaultValue: "pending",
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    orderTime: {
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

const users = sequelize.define(
  "tbl_users",
  {
    document_Identity: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motherLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  orders,
  products,
  users,
  sequelize,
};
