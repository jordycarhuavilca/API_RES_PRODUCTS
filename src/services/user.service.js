const validate = require("../helper/validate");
const constant = require("../helper/constant");
class userService {
  constructor(user) {
    this.user = user;
  }
  async addUser(user) {
    if (!validate.isEmpty(Object.values(user))) {
      const data = await this.user.addUser(user);
      constant.success.data = data;
      return constant.success;
    }
    return constant.reqValidationError;
  }
  async listarUsers() {
    const listUser = await this.user.listarUsers();
    if (!listUser) {
      constant.recordNotFound.data = {}
      return constant.recordNotFound;
    }
    constant.success.data = listUser;
    return constant.success;
  }
  async getUser(document_Identity) {
    const user = await this.user.getUser(document_Identity);
    if (!user){
      constant.recordNotFound.data = {}
      return constant.recordNotFound;
    } 
    constant.success.data = user;
    return constant.success;
  }
}
module.exports = {userService}
