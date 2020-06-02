const express= require('express');
const app = express();
const env= require('dotenv').config()
const cookieParser= require('cookie-parser')
port= process.env.port
const knex = require('./connection/knex_connection')
// const async = require('asnyc')s
const jwt= require('jsonwebtoken')
const uuid = require('uuid')
// const verify= require('./middleware/verifyjwt')
app.use(express.json())
app.use(cookieParser());


app.use('/department',department=express.Router())
require('./routers/department')(department,knex)

app.use('/category',category=express.Router())
require('./routers/category')(category,knex)

app.use('/product',product=express.Router())
require('./routers/product')(product,knex)

app.use('/attributes',attributes= express.Router())
require('./routers/attribute')(attributes,knex)
    
app.use('/customer',customer=express.Router())
require('./routers/customer')(customer,knex,jwt)

app.use('/orders',orders=express.Router())
require('./routers/order')(orders,jwt,knex)

app.use('/shopping',shopping=express.Router())
require('./routers/shopping')(shopping,knex,jwt)

app.use('/tax',tax=express.Router())
require('./routers/tax')(tax,knex)

app.use('/shipping',shipping=express.Router())
require('./routers/shipping')(shipping,knex)




app.listen(port,(req,res)=>{
    console.log("server running on ",port)

})