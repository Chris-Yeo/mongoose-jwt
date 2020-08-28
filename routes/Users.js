const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllUsers,
    getOneUser,
    addUser,
    login,
    updateUser,
    deleteUser
} = require('../controllers/Users')

route.get('/users', getAllUsers)
route.get('/users/:id', getOneUser)
route.post('/users', addUser)
route.post('/users/login', login)
route.put('/users/:id', verifyToken, updateUser)
route.delete('/users/:id', verifyToken, deleteUser)

module.exports = route