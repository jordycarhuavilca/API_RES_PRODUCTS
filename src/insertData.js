const listModels = require("./db/associations");
const path = require("path");
const fs = require("fs").promises;
const dateHelper = require("./helper/date");

const getCurrentPath = (filename, extention) => {
  return path.join(__dirname, `./data/${filename}.data.${extention}`);
};

const insertData = async (pathWay, model, nameModel) => {
  try {
    let dataString = await fs.readFile(pathWay, "utf-8");
    if (nameModel == "orders") {
      const list = JSON.parse(dataString);
      list.forEach((data) => {
        data.orderTime = dateHelper.getCurrentTime();
        data.orderDate = dateHelper.getCurrentDate();
      });
      dataString = JSON.stringify(list);
    }
    model.bulkCreate(JSON.parse(dataString));
    console.log(`${nameModel} inserted successfully`);
  } catch (error) {
    console.log(`error inserting data ${error}`);
  }
};

const insert = async () => {
  const listNameData = [
    "users",
    "products",
    "features",
    "features_value",
    "orders",
    "orderDetail",
  ];
  let index = 0;
  const { orders, products, users, Features, Features_values, orderDetail } =
    listModels;

  const orderModels = {
    user: users,
    products: products,
    Features: Features,
    Features_values: Features_values,
    orders: orders,
    orderDetail: orderDetail,
  };

  for (let key in orderModels) {
    const pathWay = getCurrentPath(listNameData[index], "json");
    await insertData(pathWay, orderModels[key], listNameData[index]);
    index++;
  }
};
module.exports = insert;
