const constant = require("../helper/constant");
const sequelizeConne = require("../db/Connection");
const { getCurrentTime } = require("../helper/date");
const errorHandler = require('../helper/errorHandler')
const orderHelper = require('../helper/order.helper')
const request = require('../utils/request');
const validate = require('../helper/validate')
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
    const body = {
      list: list,
      dni: document_Identity,
    };
    
    await request.doRequest('post',"/reports/add",body)
    .catch((err)=>{
      if (err ) {
        const {statusCode} = constant.serverError
        throw new errorHandler.HttpError("something failed, it couldn't make report",statusCode)
      }
    });
  }
  async doOrder(listProd, document_Identity) {
      const nextNumOrder =await this.order.getNextNumOrder()

      const listWithOrderId = orderHelper.addNextId(validate.copyArray(listProd),nextNumOrder, 'numOrder');
      const listWithOrderDetailId = orderHelper.addTotal(validate.copyArray(listProd));

      const orderParams = {
        numOrder : nextNumOrder,
        document_Identity: document_Identity,
        orderTime: getCurrentTime(),
      }

      const res = await sequelizeConne.transaction(async (t) => {
        try {

          const order = await this._addOrder(orderParams,t)
          const orderDetail =await this._addOrderDetail(listWithOrderDetailId,t);
          order.setDataValue("orderDetail", orderDetail);
          await this._doReport(listWithOrderId,document_Identity)
          return order;

        } catch (error) {      
          if (error instanceof errorHandler.ValidateError) {
            const {message,statusCode} = constant.reqValidationError
            throw new errorHandler.ValidateError(message,statusCode)
          } 
          if (error instanceof errorHandler.HttpError) {
            throw new errorHandler.HttpError(error.message,error.statusCode)
          }
          const {message,statusCode} = constant.serverError
          throw new errorHandler.InternalServerError(error.message,statusCode)
        }
      })

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
