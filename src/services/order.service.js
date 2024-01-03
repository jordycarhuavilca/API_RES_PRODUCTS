const constant = require("../helper/constant");
const sequelizeConne = require("../db/Connection");
const sequelize = require('sequelize')
const { getCurrentTime } = require("../helper/date");
const errorHandler = require('../helper/errorHandler')
const orderHelper = require('../helper/order.helper')
const request = require('../utils/request');
const validate = require('../helper/validate')
const handleCommonErr = require('../helper/handleCommonErrors')

class orderService {
  constructor(order) {
    this.order = order;
  }
  async _addOrder(order,t){
    return await this.order.addOrder(order, t);
  }
  async _addOrderDetail(list , t){
    return await this.order.addOrderDetail(list, t);
  }
  async _doReport(list,document_Identity){
    const data = {
      list: list,
      dni: document_Identity,
    };
    
    await request.doRequest('post',"/reports/add",data)
    .catch((err)=>{
      if (err ) {
        console.log(err.message)
        const {statusCode} = constant.serverError
        throw new errorHandler.HttpError("something failed, it couldn't make report",statusCode)
      }
    });
  }
  async doOrder(listProd, document_Identity) {
      const nextNumOrder =await handleCommonErr.handleErr(this.order.getNextNumOrder(),sequelize.Error)

      const listWithOrderId = orderHelper.addNextId(validate.copyArray(listProd),nextNumOrder, 'numOrder');
      const listWithOrderDetailId = orderHelper.addTotal(validate.copyArray(listWithOrderId));

      const orderParams = {
        numOrder : nextNumOrder,
        document_Identity: document_Identity,
        orderTime: getCurrentTime(),
      }

      const res = await handleCommonErr.handleErr(sequelizeConne.transaction(async (t) => {
          const order = await this._addOrder(orderParams,t)
          const orderDetail =await this._addOrderDetail(listWithOrderDetailId,t)
          order.setDataValue("orderDetail", orderDetail);
          await this._doReport(listWithOrderId,document_Identity)
          return order;
      }),sequelize.Error)

      return res;
  }

  async getOrdersDetail(numOrder) {
    const data = await handleCommonErr.handleErr(this.order.getOrdersDetail(numOrder),sequelize.Error)
    
    if (!data) {
      const {message,statusCode} = constant.recordNotFound
      throw new errorHandler.NotFoundError(message,statusCode)
    }
    return data;
  }

  async getMyPurchases(idcliente) {
    const data = await handleCommonErr.handleErr(this.order.getMyPurchases(idcliente),sequelize.Error)

    if (!data) {
      const {message,statusCode} = constant.recordNotFound
      throw new errorHandler.NotFoundError(message,statusCode)
    }

    return data;
  }
}

module.exports = { orderService };
