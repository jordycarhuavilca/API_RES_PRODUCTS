const { orders } = require("../db/models/orders.models");
const { orderRespos } = require("../repos/order.repos");
const { orderService } = require("../services/order.service");
const constant = require("../utils/constant");
const errorHandler = require('../utils/errorHandler')

const productRepository = new orderRespos(orders);
const product_service = new orderService(productRepository);

const addOrder = async (req, res) => {
  try {
    const listProducts =  req.body
    const {idCliente} =  req.params
    const {message,statusCode} = constant.reqValidationError
    
    if (!Array.isArray(listProducts) || listProducts.length == 0)throw new errorHandler.ValidateError("type of data is not an array or it's empty",statusCode)
    
    listProducts.forEach(({quantity,total,product_id,price})=>{
      if (!quantity || !total || !product_id || !price) throw new errorHandler.ValidateError(message,statusCode)
    })

    const response = await product_service.addOrder(
        listProducts,
        idCliente
    );
    
    return res
      .status(constant.reqCreated.statusCode)
      .json({ message: constant.reqCreated.message, data: response });
  } catch (err) {

    //si es un errorHandle
    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message ,data: []});
    }
  
    // commun error
    return res.status(constant.serverError.statusCode).json({ message: err.message , data: []});
  }
};
const getOrdersDetail = async (req,res)=>{
  // res.header('Content-Type', 'application/json');
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3008');
  try {
    const response = await product_service.getOrdersDetail(
      req.params.numOrder
    );
    return res
      .status(response.statusCode)
      .send({ message: response.message, data: response.data });
  } catch (err) {
    return res.status(serverError.statusCode).json({ message: err });
  }
}
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
  getOrdersDetail
};
