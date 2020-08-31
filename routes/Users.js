const express = require('express')
const { verifyToken } = require('../helpers/token')
const route = require('express').Router()
const { jwtAuth } = require('../helpers/auth')

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
route.put('/users/:id', jwtAuth, updateUser)
route.delete('/users/:id',jwtAuth, deleteUser)

module.exports = route