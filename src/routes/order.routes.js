const Express = require("express");
const router = Express.Router();
const { addOrder, getMyPurchases,getOrdersDetail} = require("../controllers/order.controller");

router.post("/checkout/:idCliente/buying", addOrder);
router.get("/:idCliente/my_purchases", getMyPurchases);
router.get("/:numOrder/getOrdersDetail",getOrdersDetail);

module.exports = router;
