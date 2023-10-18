const { orders, users, products } = require("../db/models/index.models");
const { getDate, getTime } = require("../libs/date.libs");
const moment = require("moment");

const addCliente = (listorders, document_Identity) => {
  listorders.forEach((order) => {
    order.document_Identity = document_Identity;
  });

  return listorders;
};

// const updateProduct = async (order, product) => {
//   const [product_id, quantity] = order;

//   if (product.stock >= quantity &&product.estado = "avialable") {
//     const stock = product.stock - quantity;
//     product.stock = stock
//     if(stock == 0) product.estado = "Sold out"
//       await products.update(
//         product,
//       {
//         where: {
//           product_id: product_id,
//         },
//       }
//     );
//   }
// };

const addProduct = async (req, res) => {
  const idcliente = req.params.idCliente;
  const listorders = req.body;

  console.log(typeof listorders);
  if (listorders.length > 0) {
    const list = addCliente(listorders, idcliente);
    try {
      const listProducts = await orders.bulkCreate(list);

      try {
        listProducts.forEach((order) => {
          let date = order.orderDate;
          let time = order.orderTime;
          // Parse the date and time using moment
          const parsedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
          const parsedTime = moment(time, "YYYY-MM-DD HH:mm:ss.SSS").format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          );
          order.orderDate = parsedDate;
          order.orderTime = ''
          order.orderTime = getTime(parsedTime);


        });
      } catch (error) {
        return res.status(500).json({ message: "error " + error });
      }

      return res.status(200).send(listProducts);
    } catch (err) {
      return res.status(500).json({ message: "err in the database! " + err });
    }
  } else {
    return res.status(400).json({ message: "invalid request" });
  }
};

const getMyPurchases = async (req, res) => {
  try {
    const idcliente = req.params.idCliente;
    console.log(idcliente);
    if (!idcliente) {
      return res.status(400).json({ message: "Tienes que registrarte" });
    }
    console.log("searching ...");
    const listMysPurchases = await users.findAll({
      where: {
        document_Identity: idcliente,
      },
      include: {
        model: orders,
        as: "Pedido",
        attributes: { exclude: ["product_id", "document_Identity"] },
        include: {
          model: products,
          as: "Producto",
          attributes: { exclude: ["product_id", "product_quantity", "estado"] },
        },
      },
    });
    return res.status(200).send(listMysPurchases);
  } catch (error) {
    return res.status(500).json({ message: "err in the database! " + error });
  }
};

module.exports = {
  addProduct,
  getMyPurchases,
};
