const mongoose = require('mongoose')
require('dotenv').config()

//url mongo atlas
const url= process.env.DB_URI;


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;


module.exports = db;