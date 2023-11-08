const sequelize = require("../Connection.js");
const { DataTypes } = require("sequelize");

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
  users
}
