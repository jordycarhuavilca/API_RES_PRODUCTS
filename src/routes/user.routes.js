const Express = require('express')
const router = Express.Router()
const {addUser,getUser,listarUsers} = require('../controllers/user.controller')

router.get('/:nrodocument',getUser)
router.get('/checkout/listUsers',listarUsers)
router.post('/add',addUser)

module.exports = router