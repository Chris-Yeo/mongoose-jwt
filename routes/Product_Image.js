const express = require('express')
const route = express.Router();
const { verifyToken } = require('../helpers/token')

const {
    getAllImages,
    getOneImage,
    addImage
} = require('../controllers/Product_Images')

route.get('/images', getAllImages)
route.get('/images/:id', getOneImage)
route.post('/images',verifyToken, addImage)

module.exports = route