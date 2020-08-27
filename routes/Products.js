const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllProducts,
    getOneProduct,
    addProduct
} = require('../controllers/Products')

route.get('/products', getAllProducts)
route.get('/products/:id', getOneProduct)
route.post('/products',verifyToken, addProduct)

module.exports = route