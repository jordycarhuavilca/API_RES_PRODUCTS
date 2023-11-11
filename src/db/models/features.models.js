const sequelize = require("../Connection.js");
const { DataTypes } = require("sequelize");

const Features = sequelize.define("Features", {
  FeatureId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  feature_name: {
    type: DataTypes.STRING,
    unique: true,
  },
},{
  timestamps: false,
});
module.exports = {
  Features,
};
