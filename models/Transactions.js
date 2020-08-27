const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

const Schema = mongoose.Schema

const transactionsSchema = new Schema ({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    id_product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    id_cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },
    status_transaction: {
        type: Boolean
    },
    total_price: {
        type: Number,
        required: true
    }
})

const Transactions = mongoose.model('transactions', transactionsSchema)

module.exports = Transactions