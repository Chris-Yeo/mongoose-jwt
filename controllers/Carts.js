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
            const addCart = await Carts.create({
                ...req.body
            })
            if(addCart){
                res.status(200).json({
                    message: "Cart Added",
                    addCart
                })
            } else {
                res.status(400).json({
                    message: "Failed to add cart"
                })
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Invalid Server Error"
            })
        }
    },

    updateCart: async (req, res) => {
        try{
            const updatedCart = await Carts.findOneAndUpdate(
                {_id: req.params.id},
                {...req.body}
            )
            if(updatedCart){
                res.status(200).json({
                    message: "Cart is Updated",
                    updatedCart
                })
            } else {
                res.status(400).json({
                    message: "Cart failed to update"
                })
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Invalid Server Error"
            })
        }
    },

    deleteCart: async (req, res) => {
        try{
            deletedCart = await Carts.findOneAndDelete({
                _id: req.params.id
            })
            if(deletedCart){
                res.status(200).json({
                    message: "Cart Deleted!",
                    deletedCart
                })
            } else {
                res.status(400).json({
                    message: "Cannot delete cart"
                })
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Invalid Server Error"
            })
        }
    }
}