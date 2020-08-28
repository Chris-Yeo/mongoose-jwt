const Carts = require('../models/Carts')


module.exports = {
    getAllCarts: async(req, res) => {
        try{
            const cart = await Carts.find({})
            .populate({path:'id_user', select: 'username'})
            .populate({path: 'id_product', select: 'product_name'})

            if(cart){
                res.send({
                    message: 'Your Cart',
                    data: cart
                })
            } else {
                res.status(400).json({
                    message: "Cart Fetching Failed"
                })
            }
        }
        catch(error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
            
        }
    },
    getOneCart: async(req, res) => {
        try{
            const cart = await Carts.findById(req.params.id)
            .populate({path:'id_user', select: 'username phone address'})
            .populate({path: 'id_product', select: 'product_name price'})
            if(cart){
                res.send({
                    message: "Your Cart",
                    data: cart
                })
            } else {
                res.status(400).json({
                    message: "Failed To Get Cart"
                })
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
    makeCart: async(req, res) => {
        try{
            const {id_user, id_product, quantity, status_cart} = req.body
            const newCart = await Carts.create({
                id_user, 
                id_product, 
                quantity, 
                status_cart
            })
            if(newCart){
                res.status(200).json({
                    message: "Cart Added",
                    newCart
                })
            } else {
                res.status(400).json({
                    message: "Failed to Create Cart"
                })
            }
        }
        catch(error){
            console.log(error);
            res.send({
                message: "Internal Server Error"
            })
        }
    }
}