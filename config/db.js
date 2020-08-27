const mongoose = require('mongoose')


const url= "mongodb+srv://root:rootroot@cluster0.wua1m.mongodb.net/test";


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;


module.exports = db;