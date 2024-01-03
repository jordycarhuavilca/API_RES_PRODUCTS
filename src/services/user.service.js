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

      const listUser = await handleCommonErr.handleErr(this.user.listarUsers(),sequelize.Error)

      if (!listUser) {
        const {message,statusCode} = constant.recordNotFound
        throw new errorHandler.NotFoundError(message,statusCode)
      }
      return listUser;
    }
    async getUser(document_Identity) {
      const user = await handleCommonErr.handleErr(this.user.getUser(document_Identity),sequelize.Error)

      if (!user){
        const {message,statusCode} = constant.recordNotFound
        throw new errorHandler.NotFoundError(message,statusCode)
      } 
      return user
    }
  }

  module.exports = {userService}
