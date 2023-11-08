const { orders } = require("../db/models/orders.models");
const { orderRespos } = require("../repos/order.repos");
const { orderService } = require("../services/order.service");
const constant = require("../utils/constant");
const { serverError } = constant;

const productRepository = new orderRespos(orders);
const product_service = new orderService(productRepository);

const addOrder = async (req, res) => {
  try {
    const response = await product_service.addOrder(
      req.body,
      req.params.idCliente
    );
    return res
      .status(response.statusCode)
      .send({ message: response.message, data: response.data });
  } catch (err) {
    return res.status(serverError.statusCode).json({ message: err });
  }
};
const getMyPurchases = async (req, res) => {
  try {
    const idcliente = req.params.idCliente;
    const response = await product_service.getMyPurchases(idcliente);
    return res
      .status(response.statusCode)
      .send({ message: response.message, data: response.data });
  } catch (err) {
    return res.status(serverError.statusCode).json({ message: err });
  }
};

module.exports = {
  addOrder,
  getMyPurchases,
};
