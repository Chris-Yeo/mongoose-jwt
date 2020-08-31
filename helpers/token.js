const jwt = require ('jsonwebtoken')
require('dotenv').config()

module.exports = {
    //data hanya merupakan alias dari isi createToken
    //... digunakan untuk membaca semua isi object tanpa mengulang isi jika banyak (id, products, dll)
    createToken: (dataUser) => {
        const token = jwt.sign({...dataUser}, process.env.SECRET_KEY_TOKEN)
        return token;
    },

    verifyToken: (req, res, next) => {
        const bearerToken = req.headers.authorization
        if(!bearerToken) {
            res.status(401).json({
                message: 'Unauthorized Entry'
            })
        }
        try {
            const token = bearerToken.split(" ")[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
            if(decoded) {
                next()
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).json({
                message: 'Invalid Signature'
            })
        }
    }
}