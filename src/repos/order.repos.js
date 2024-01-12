const { orderDetail } = require("../db/models/orderDetail.models");
const { products } = require("../db/models/products.models");
const { Features_values } = require("../db/models/features_value.models");
const { Features } = require("../db/models/features.models");

class orderRespos {
  constructor(order) {
    this.order = order;
  }
  async getNextNumOrder() {
    const listOrder =await this.order.findAll();
    if (listOrder.length === 0) {
      return 1
    }
    let rpta = listOrder.sort((a, b) => b.numOrder - a.numOrder)[0].numOrder +1
    return rpta
  }
  async addOrder(order, trans) {
    return await this.order.create(order,{transaction : trans});
  }
  async addOrderDetail(listProducts, trans) {
    return await orderDetail.bulkCreate(listProducts,{transaction : trans});
  }
  async getOrdersDetail(numOrder){
    return await orderDetail.findAll({
      where:{
        numOrder : numOrder 
      },
      attributes : { exclude : ["product_id","numOrder"]},
      include: {
        model : products,
        attributes : { exclude : ["stock","estado"]},
        include : {
          model : Features_values,
          attributes : { exclude : ["Feature_valueId","product_id","FeatureId"]},
          include  :{
            model : Features,
            attributes : { exclude : ["FeatureId"]},
          }
        }
      }
    })
  }
  async getMyPurchases(idcliente) {
    return await this.order.findAll({
      where: {
        document_Identity: idcliente,
      },
      attributes: {
        exclude: ["document_Identity", "numOrder"],
      },
      include: [{
        model: orderDetail,
        attributes: { exclude: ["numOrder", "product_id","orderDetailId"] },
        include: {
          model: products,
          attributes: { exclude: ["product_id", "stock", "estado"] },
        },
      }],
    });
  }
}
module.exports = {
  orderRespos,
};
