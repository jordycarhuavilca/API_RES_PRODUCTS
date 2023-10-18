const { orders, products, users } = require("./db/models/index.models");
const path = require("path");
const fs = require("fs").promises;

async function getData(pathWay2) {
  const res = await fs.readFile(pathWay2, "utf-8");
  return res;
}

function pathWay(fileName) {
  return path.join(__dirname, `./Data/${fileName}.data.json`);
}

const insertUser = async () => {
  const dataString = await getData(pathWay("users"));
  const data = JSON.parse(dataString);
  users
    .bulkCreate(data)
    .then(() => {
      console.log("inserted data to the table user");
    })
    .catch((err) => {
      console.log("error inserting data to the table users " + err);
    });
};
const insertProducts = async () => {
  const dataString = await getData(pathWay("products"));
  const data = JSON.parse(dataString);

  products
    .bulkCreate(data)
    .then(() => {
      console.log("inserted data to the table Products");
    })
    .catch((err) => {
      console.log("error inserting data to the table Products " + err);
    });
};
const inserstOrders = async () => {
  const dataString = await getData(pathWay("orders"));
  const data = JSON.parse(dataString);

  orders
    .bulkCreate(data)
    .then(() => {
      console.log("inserted data to the table orders");
    })
    .catch((err) => {
      console.log("error inserting data to the table orders " + err);
    });
};

async function insertData() {
  await insertUser();
  await insertProducts();
  await inserstOrders();
}

module.exports = insertData;
