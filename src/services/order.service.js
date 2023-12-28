const constant = require("../utils/constant");
const sequelize = require("../db/Connection");
const { getCurrentTime } = require("../utils/date.utils");
const axios = require("axios");
const errorHandler = require('../utils/errorHandler')


const setOrder = (document_Identity) => {
  return {
    document_Identity: document_Identity,
    orderTime: getCurrentTime(),
  };
};

const addNumOrder = (listProducts, nextOrderid) => {
  for (let i = 0; i < listProducts.length; i++) {
    listProducts[i].numOrder = nextOrderid;
  }
  return listProducts;
};

const getTotal = (price, quantity) => {
  
  return price * quantity;
};

const adjustList = (list) => {
  const newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push({
      numOrder: list[i].numOrder,
      quantity: list[i].quantity,
      total: getTotal(list[i].price, list[i].quantity),
      product_id: list[i].product_id,
    });
  }
  return newList;
};

async function addReport(list,document_Identity){
  const body = {
    list: list,
    dni: document_Identity,
  };
  await axios.post("http://SERVER_B:3008/reports/add", body)
  .catch((err)=>{
    if (err) {
      const {message,statusCode} = constant.serverError
      throw new errorHandler.InternalServerError(message,statusCode)
    }
  });
}

class orderService {
  constructor(order) {
    this.order = order;
  }
  async addOrder(listProducts, document_Identity) {
      const nextOrderid = await this.order.getNextOrderId();

      let list = addNumOrder(listProducts, nextOrderid);

      const res = await sequelize.transaction(async (t) => {
        try {

          const order = await this.order.addOrder(setOrder(document_Identity), t);
          list = adjustList(list);
          const orderDetail = await this.order.addOrderDetail(list, t);
          order.orderDetail = orderDetail;
          await addReport(listProducts,document_Identity)
          return order;

        } catch (error) {     

          if (error.name === 'SequelizeUniqueConstraintError'
           || error.name === 'SequelizeValidationError'
           || error.name === 'SequelizeForeignKeyConstraintError'
           ) {
            const {message,statusCode} = constant.reqValidationError
            throw new errorHandler.ValidateError(message,statusCode)
          } 
           
          const {message,statusCode} = constant.serverError
          throw new errorHandler.InternalServerError(message,statusCode)
        }
      });
      return res;
  }

  async getOrdersDetail(numOrder) {
    const data = await this.order.getOrdersDetail(numOrder);
    if (!data) {
      constant.recordNotFound.data = {};
      return constant.recordNotFound;
    }
    constant.success.data = data;
    return constant.success;
  }

  async getMyPurchases(idcliente) {
    const myPurchase = await this.order.getMyPurchases(idcliente);
    if (!myPurchase) {
      constant.recordNotFound.data = {};
      return constant.recordNotFound;
    }
    constant.success.data = myPurchase;
    return constant.success;
  }
}

module.exports = { orderService };
