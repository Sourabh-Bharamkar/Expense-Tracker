const express = require('express')
const app = express();

const sequelize = require('./util/database')
const bodyParser = require('body-parser')
const path = require('path')

const expenseRoutes=require('./routes/expense')
const userRoutes=require('./routes/user')
const purchaseRoutes=require('./routes/purchase')
const cors=require('cors')

const User=require('./models/user')
const Expense=require('./models/expense')
const Order=require('./models/order')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))

app.use(userRoutes)
app.use(expenseRoutes)
app.use(purchaseRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

sequelize.sync()
    .then(() => {
    
        app.listen('3000')
    }).catch((error) => {
        console.log(error)
    })





