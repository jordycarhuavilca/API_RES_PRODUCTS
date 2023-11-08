const constant = require("../utils/constant");
const sequelize = require("../db/Connection");
const { getCurrentTime } = require("../utils/date.utils");

const setOrder = (document_Identity) => {
  return {
    document_Identity: document_Identity,
    orderTime: getCurrentTime(),
  };
};

const addOrderId = (listProducts, nextOrderid) => {
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

      const list = addOrderId(listProducts, nextOrderid);

      const res = await sequelize.transaction(async (t) => {
        const order = await this.order.addOrder(setOrder(document_Identity), t);
        const orderDetail = await this.order.addOrderDetail(list, t);
        order.orderDetail = orderDetail;
        return order;
      });

      constant.success.data = res;
      return constant.success;
    }
    constant.reqValidationError.data = {}
    return constant.reqValidationError;
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
