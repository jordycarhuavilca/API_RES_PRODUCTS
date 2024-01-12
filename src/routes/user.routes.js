const Express = require('express')
const router = Express.Router()
const {addUser,getUser,listarUsers} = require('../controllers/user.controller')

router.post('/add',addUser)
router.get('/:nrodocument',getUser)
router.get('/checkout/listUsers',listarUsers)

module.exports = router