const Express = require("express");
const app = Express();
require("dotenv").config();
const userRoutes = require('./routes/user.routes')
const orderRoute = require('./routes/order.routes')
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({extended : true}))
app.use('/user',userRoutes)
app.use('/order',orderRoute)
app.all('*',(req,res,next)=>{
    console.log("what's going on here")
    next()
})

module.exports = app