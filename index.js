 const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser')

const userRouter = require('./routes/Users')
const cartRouter = require('./routes/Carts')
const imageRouter = require('./routes/Product_Image')
const productRouter = require('./routes/Products')
const transactionRouter = require('./routes/Transactions')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/', userRouter)
app.use('/', cartRouter)
app.use('/', imageRouter)
app.use('/', productRouter)
app.use('/', transactionRouter)

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => console.log('We Are Connected'));

app.listen(8000, ()=> {
    console.log('Connected')
})