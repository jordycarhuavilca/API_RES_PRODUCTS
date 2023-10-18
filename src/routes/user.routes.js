const Express = require('express')
const router = Express.Router()
const {addUser,getUser,listarUsers} = require('../controllers/user.controller')

router.get('/users/:nrodocument',getUser)
router.get('/users',listarUsers)
router.post('/add/user',addUser)

module.exports = router