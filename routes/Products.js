const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/Products')

route.get('/products', getAllProducts)
route.get('/products/:id', getOneProduct)
route.post('/products',verifyToken, addProduct)
route.put('/products/:id', verifyToken, updateProduct)
route.delete('/products/:id', verifyToken, deleteProduct)

module.exports = route