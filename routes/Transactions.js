const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllTransactions,
    getOneTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/Transactions')

route.get('/transactions', getAllTransactions)
route.get('/transactions:id', getOneTransaction)
route.post('/transactions',verifyToken, addTransaction)
route.put('/transactions/:id', verifyToken, updateTransaction),
route.delete('/transactions:id', verifyToken, deleteTransaction)

module.exports = route