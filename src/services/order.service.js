const constant = require("../utils/constant");
const sequelize = require("../db/Connection");
const { getCurrentTime } = require("../utils/date.utils");
const {parse, stringify} = require('flatted');
const axios = require("axios");
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

class orderService {
  constructor(order) {
    this.order = order;
  }
  async addOrder(listProducts, document_Identity) {
    if (Array.isArray(listProducts) && listProducts.length > 0) {
      const nextOrderid = await this.order.getNextOrderId();

      const list = addNumOrder(listProducts, nextOrderid);

      try {
        const body = {
          list: list,
          dni: document_Identity,
          numOrder: nextOrderid,
        };
        const response = await axios.post(
          "http://SERVER_B:3008/reports/add",
          body
        );
        console.log("response " +  stringify(response));

        if (!response) {
          constant.success.data = {};
          return constant.reqValidationError;
        }
      } catch (error) {
        console.log("error " + error);
      }

      const res = await sequelize.transaction(async (t) => {
        const order = await this.order.addOrder(setOrder(document_Identity), t);
        const orderDetail = await this.order.addOrderDetail(list, t);
        order.orderDetail = orderDetail;
        return order;
      });

      constant.success.data = res;
      return constant.success;
    }
    constant.reqValidationError.data = {};
    return constant.reqValidationError;
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
