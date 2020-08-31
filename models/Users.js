const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    providerId: {
        type: String,
        require: false
    },
    provider: {
        type: String,
        require: false
    },
    fullname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

usersSchema.plugin(findOrCreate);

const Users = mongoose.model('users', usersSchema)

module.exports = Users