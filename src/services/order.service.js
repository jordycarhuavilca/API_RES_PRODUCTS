const constant = require("../utils/constant");
const sequelize = require("../db/Connection");
const { getCurrentTime } = require("../utils/date.utils");
const { stringify } = require("flatted");
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

const getTotal = (price, quantity) => {
  console.log("price " + price);
  console.log("quantity " + quantity);
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

class orderService {
  constructor(order) {
    this.order = order;
  }
  async addOrder(listProducts, document_Identity) {
    if (Array.isArray(listProducts) && listProducts.length > 0) {
      const nextOrderid = await this.order.getNextOrderId();

      let list = addNumOrder(listProducts, nextOrderid);

      console.log("list " + JSON.stringify(list))
      const res = await sequelize.transaction(async (t) => {
        const order = await this.order.addOrder(setOrder(document_Identity), t);
        list = adjustList(list);
        const orderDetail = await this.order.addOrderDetail(list, t);
        order.orderDetail = orderDetail;
        return order;
      });

      try {
        const body = {
          list: list,
          dni: document_Identity,
        };
        await axios.post("http://SERVER_B:3008/reports/add", body);
      } catch (error) {
        console.log("error " + error);
        constant.success.data = {};
        return constant.reqValidationError;
      }

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
