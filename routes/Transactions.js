const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllTransactions,
    getOneTransaction,
    addTransaction
} = require('../controllers/Transactions')

route.get('/transactions', getAllTransactions)
route.get('/transactions:id', getOneTransaction)
route.post('/transactions',verifyToken, addTransaction)

module.exports = route