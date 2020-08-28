
const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllCarts,
    getOneCart,
    makeCart,
    updateCart,
    deleteCart
} = require('../controllers/Carts')

route.get('/carts', getAllCarts)
route.get('/carts/:id', getOneCart)
route.post('/carts',verifyToken, makeCart)
route.put('/carts/:id', verifyToken, updateCart)
route.delete('/carts/:id', verifyToken, deleteCart)

module.exports = route
