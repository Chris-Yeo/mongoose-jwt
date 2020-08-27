
const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllCarts,
    getOneCart,
    makeCart,
} = require('../controllers/Carts')

route.get('/carts', getAllCarts)
route.get('/carts/:id', getOneCart)
route.post('/carts',verifyToken, makeCart)

module.exports = route