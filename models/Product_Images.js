const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productImagesSchema = new Schema({
    id_product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    url_image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Product_Images = mongoose.model('product_images', productImagesSchema)

module.exports = Product_Images;