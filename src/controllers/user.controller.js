const { users } = require("../db/models/user.models");
const { userRepos } = require("../repos/user.repos");
const { userService } = require("../services/user.service");
const constant = require("../helper/constant");
const validate = require("../helper/validate");
const errorHandler = require('../helper/errorHandler')

const userRepository = new userRepos(users);
const userServ = new userService(userRepository);

const getUser =async (req, res) => {
  try {
    const numDocument = req.params.nrodocument;
    const {message,statusCode} = constant.reqValidationError
    if (!numDocument) throw new errorHandler.ValidateError(message,statusCode)
  
    const data = await userServ.getUser(numDocument);
    return res
    .status(constant.success.statusCode)
    .json({ message: constant.success.message, data: data});

  } catch (err) {
    return res
    .status(err.statusCode)
    .json({ message: err.message });
  
  }

};

const listarUsers = async (req, res) => {
  try {
    const response = await userServ.listarUsers();
    return res
      .status(constant.success.statusCode)
      .json({ message: constant.success.message, data: response });
  } catch (err) {
    return res
    .status(err.statusCode)
    .json({ message: err.message });
    }
};

const addUser = async (req, res) => {
  try {
    const data = req.body;
    if(!data) res.status(constant.reqValidationError.statusCode)
    .json({ message: constant.reqValidationError.message});

    if(validate.isEmpty(Object.values(data))) res.status(constant.reqValidationError.statusCode)
    .json({ message: constant.reqValidationError.message});

    const response = await userServ.addUser(data);
    return res
    .status(constant.reqCreated.statusCode)
    .json({ message: constant.reqCreated.message, data: response });
      
  } catch (err) {
    return res
    .status(err.statusCode)
    .json({ message: err.message });
  }
};
module.exports = {
  getUser,
  listarUsers,
  addUser,
};
