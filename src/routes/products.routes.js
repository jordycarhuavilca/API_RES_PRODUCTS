const Express = require('express')
const router = Express.Router()
const {addProduct,getMyPurchases} = require('../controllers/products.controller') 

router.post('/checkout/:idCliente/buying',addProduct)
router.get('/:idCliente/my_purchases',getMyPurchases)

module.exports  = router
