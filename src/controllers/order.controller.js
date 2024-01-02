const { orders } = require("../db/models/orders.models");
const { orderRespos } = require("../repos/order.repos");
const {orderService }= require("../services/order.service");
const constant = require("../helper/constant");

const productRepository = new orderRespos(orders);
const product_service = new orderService(productRepository);

const addOrder = async (req,res) => {
  console.log(req.headers)
  try {
    const listProducts =  req.body
    const {idCliente} =  req.params
    
    if (!Array.isArray(listProducts) || listProducts.length == 0 || typeof listProducts[0] != "object")
    return res
    .status(constant.reqValidationError.statusCode)
    .json({ message: constant.reqValidationError.message});

    listProducts.forEach(({quantity,total,product_id,price})=>{
      if (!quantity || !total || !product_id || !price) 
      return res
      .status(constant.reqValidationError.statusCode)
      .json({ message: constant.reqValidationError.message});
    })

    const response = await product_service.doOrder(
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
