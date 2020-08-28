const Transactions = require('../models/Transactions')
const Products = require('../models/Products')
const Carts = require('../models/Carts')

module.exports = {
    getAllTransactions: async (req, res) => {
        try{
            const transactions = await Transactions.find({})
            .populate({ path: 'id_user', select: 'username'})
            .populate({ path: 'id_product', select: 'product_name price'})
            .populate({ path: 'id_cart', select: 'quantity status_cart'})
            if(transactions) {
                res.status(200).json({
                    message: "All Transactions",
                    transactions
                })
            } else {
                res.status(400).json({
                    message: "Failed to get Transactions"
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

    getOneTransaction: async(req, res) => {
        try {
            const transactions = await Transactions.findById(req.params.id)
            .populate({path: 'id_product', select: 'product_name description price'})
            .populate({path: 'id_user', select: 'fullname email phone address'})
            .populate({path: 'id_cart', select: 'quantity status_cart'})
            if(transactions) {
                res.status(200).json({
                    message: "Your Transaction",
                    transactions
                })
            } else {
                res.status(400).json({
                    message: "Failed to get Transactions"
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

    addTransaction: async (req, res) => {
        try{
            const Product = Products.findOne({
                _id: req.body.id_product
            })
            let price = await Product.price
            const cart = await Carts.findOne({
                _id: req.body.id_cart
            })
            
            let quantity = await cart.quantity
            
            const updatedCart = await Carts.findOneAndUpdate({
                _id: req.body.id_cart
            },{
                status_cart:false
            })
            let totalPrice = await quantity*price;

            const newTransaction = await Transactions.create({
                ...req.body,
                total_price: totalPrice
            })
            if(newTransaction){
                res.status(200).json ({
                    message: 'Transaction added',
                    updatedCart
                })
            } else {
                res.status(400).json({
                    message: 'Transaction Failed'
                })
            }
        }
        catch(err){
            console.log(err);
            
            res.status(500).json({
                message: 'Invalid Server Error'
            })
        }
    },

    updateTransaction: async(req, res) => {
        try{
            updatedTransaction = await Transactions.findOneAndUpdate(
                {_id: req.params.id},
                {...req.body}
            )
            if(updatedTransaction){
                res.status(200).json({
                    message: "Transaction Updated!",
                    updatedTransaction
                })
            } else {
                res.status(400).json({
                    message: "Transaction failed to update"
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

    deleteTransaction: async (req, res) => {
        try{
            deletedTransaction = await Transactions.findOneAndDelete({
                _id: req.params.id
            })
            if(deletedTransaction){
                res.status(200).json({
                    message: "Transaction Deleted!",
                    deletedTransaction
                })
            } else {
                res.status(400).json({
                    message: "Failed to delete transaction"
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