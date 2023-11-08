
const {Op} = require('sequelize')
class userRepos {
  constructor(user) {
    this.user = user;
  }
  async addUser(user) {
    return await this.user.create(user);
  }
  async listarUsers() {
    return await this.user.findAll();
  }
  async getUser(document_Identity) {
    return await this.user.findAll({
      where: {
        document_Identity: {
          [Op.eq]: document_Identity,
        },
      },
      attributes: [
        ["document_Identity", "Dni"],
        "name",
        ["fatherLastName", "firstLastName"],
        ["motherLastName", "SecondLastName"],
      ],
    });
  }
}
module.exports = {userRepos}
