const { users } = require("../db/models/user.models");
const { userRepos } = require("../repos/user.repos");
const { userService } = require("../services/user.service");
const constant = require("../helper/constant");

const userRepository = new userRepos(users);
const userServ = new userService(userRepository);

const { serverError } = constant;
const getUser =async (req, res) => {
  const numDocument = req.params.nrodocument;
  try {
    const response =await userServ.getUser(numDocument);
    return res
      .status(response.statusCode)
      .json({ message: response.message, data: response.data });
  } catch (err) {
    return res.status(serverError.statusCode).json({ message: err });
  }
};

const listarUsers = async (req, res) => {
  try {
    const response = await userServ.listarUsers();
    return res
      .status(response.statusCode)
      .json({ message: response.message, data: response.data });
  } catch (err) {
    return res.status(serverError.statusCode).json({ message: err });
  }
};

const addUser = async (req, res) => {
  const data = req.body;
  try {
    const response = await userServ.addUser(data);
    return res
      .status(response.statusCode)
      .json({ message: response.message, data: response.data });
  } catch (err) {
    return res.status(serverError.statusCode).json({ message: err });
  }
};
module.exports = {
  getUser,
  listarUsers,
  addUser,
};
