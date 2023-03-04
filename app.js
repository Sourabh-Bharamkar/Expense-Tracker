const express = require('express')
const app = express();

const sequelize = require('./util/database')
const bodyParser = require('body-parser')
const path = require('path')
const expenseRoutes=require('./routes/expense')
const userRoutes=require('./routes/user')
const cors=require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))

app.use(userRoutes)
app.use(expenseRoutes)



sequelize.sync()
    .then(() => {
    
        app.listen('3000')
    }).catch((error) => {
        console.log(error)
    })





