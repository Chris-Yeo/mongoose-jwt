const Transactions = require('../models/Transactions')

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

    addTransaction: async(req, res) => {
        try{
            const {
                id_user,
                id_product,
                id_cart,
                status_transaction,
                total_price
            } = req.body
            const transaction = await Transactions.create({
                id_user,
                id_product,
                id_cart,
                status_transaction,
                total_price
            })
            if(transaction) {
                res.status(200).json({
                    message: "Transaction Created",
                    transaction
                })
            } else {
                res.status(400).json({
                    message: "Transaction Failed"
                })
            }
        }
        catch(error) {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}