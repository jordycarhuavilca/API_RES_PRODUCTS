const { orderDetail } = require("../db/models/orderDetail.models");
const { products } = require("../db/models/products.models");
const { orders } = require("../db/models/orderDetail.models");

class orderRespos {
  constructor(order) {
    this.order = order;
  }
  async getNextOrderId() {
    const listOrder =await this.order.findAll();
    return listOrder.sort((a, b) => b.numOrder - a.numOrder)[0].numOrder + 1;
  }
  async addOrder(order, trans) {
    return await this.order.create(order,{transaction : trans});
  }
  async addOrderDetail(listProducts, trans) {
    return await orderDetail.bulkCreate(listProducts,{transaction : trans});
  }
  async getMyPurchases(idcliente) {
    return await this.order.findAll({
      where: {
        document_Identity: idcliente,
      },
      attributes: {
        exclude: ["document_Identity", "numOrder"],
      },
      include: {
        model: orderDetail,
        attributes: { exclude: ["numOrder", "product_id","orderDetailId"] },
        include: {
          model: products,
          attributes: { exclude: ["product_id", "stock", "estado"] },
        },
      },
    });
  }
}
module.exports = {
  orderRespos,
};
