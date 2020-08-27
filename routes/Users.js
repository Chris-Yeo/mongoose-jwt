const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllUsers,
    getOneUser,
    addUser,
    login
} = require('../controllers/Users')

route.get('/users', getAllUsers)
route.get('/users/:id', getOneUser)
route.post('/users', addUser)
route.post('/users/login', login)

module.exports = route