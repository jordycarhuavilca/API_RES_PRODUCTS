const Express = require("express");
const router = Express.Router();
const { addOrder, getMyPurchases } = require("../controllers/order.controller");

router.post("/checkout/:idCliente/buying", addOrder);
router.get("/:idCliente/my_purchases", getMyPurchases);

module.exports = router;
