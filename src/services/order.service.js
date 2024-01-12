const constant = require("../helper/constant");
const sequelizeConne = require("../db/Connection");
const sequelize = require('sequelize')
const dateHelper = require("../helper/date");
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
  async _doReport(list,currentTime,currentDate,document_Identity){
    const data = {
      list: list,
      dni: document_Identity,
      fecha : currentDate,
      time: currentTime
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

      let currentTime =  dateHelper.getCurrentTime()
      let currentDate = dateHelper.getCurrentDate()
      const orderParams = {
        numOrder : nextNumOrder,
        document_Identity: document_Identity,
        orderTime: currentTime,
        orderDate : currentDate
      }

      const res = await handleCommonErr.handleErr(sequelizeConne.transaction(async (t) => {
          const order = await this._addOrder(orderParams,t)
          const orderDetail =await this._addOrderDetail(listWithOrderDetailId,t)
          order.setDataValue("orderDetail", orderDetail);
          await this._doReport(listWithOrderId,currentTime,currentDate,document_Identity)
          return order;
      }),sequelize.Error)

      return res;
  }

  async getOrdersDetail(numOrder) {
    const data = await handleCommonErr.handleErr(this.order.getOrdersDetail(numOrder),sequelize.Error)
    console.log(JSON.stringify(data))

    if (data.length == 0) {
      const {message,statusCode} = constant.recordNotFound
      throw new errorHandler.NotFoundError(message,statusCode)
    }
    return data;
  }

  async getMyPurchases(idcliente) {
    const data = await handleCommonErr.handleErr(this.order.getMyPurchases(idcliente),sequelize.Error)
    console.log(JSON.stringify(data))
   
    if (data.length == 0) {
      const {message,statusCode} = constant.recordNotFound
      throw new errorHandler.NotFoundError(message,statusCode)
    }

    return data;
  }
}

module.exports = { orderService };
