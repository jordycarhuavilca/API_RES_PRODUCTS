const sequelize = require("../Connection.js");
const { DataTypes } = require("sequelize");

const Features_values = sequelize.define("Features_value", {
  Feature_valueId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps: false,
});
module.exports = { Features_values };
