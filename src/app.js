const Express = require("express");
const app = Express();
require("dotenv").config();
const userRoutes = require('./routes/user.routes')
const productRouter = require('./routes/products.routes')
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({extended : true}))
app.use('/api',userRoutes)
app.use('/api',productRouter)

module.exports = app