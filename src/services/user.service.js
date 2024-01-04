  const constant = require("../helper/constant");
  const errorHandler = require('../helper/errorHandler')
  const handleCommonErr = require('../helper/handleCommonErrors')
  const sequelize = require('sequelize')
  class userService {
    constructor(user) {
      this.user = user;
    }
    async addUser(user) {
        const data = await handleCommonErr.handleErr(this.user.addUser(user),sequelize.Error)
        return data
    }
    async listarUsers() {

      const data = await handleCommonErr.handleErr(this.user.listarUsers(),sequelize.Error)

      if (data.length == 0) {   
        const {message,statusCode} = constant.recordNotFound
        throw new errorHandler.NotFoundError(message,statusCode)
      }
      return data;
    }
    async getUser(document_Identity) {
      const data = await handleCommonErr.handleErr(this.user.getUser(document_Identity),sequelize.Error)

      if (data.length == 0) {
        const {message,statusCode} = constant.recordNotFound
        throw new errorHandler.NotFoundError(message,statusCode)
      } 
      return data
    }
  }

  module.exports = {userService}
