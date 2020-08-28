const Products = require('../models/Products')


module.exports = {
    getAllProducts: async (req, res) => {
        const products = await Products.find({})
        .populate({path: 'images', select: 'url_image'})
        if(products){
            res.send({
                message: 'All Products', 
                status: 200,
                products
            })
        }
        else {
                res.send({
                    message: 'All Products Request Failed',
                    status: 400
                })
        }

        
        // .then(result => {
        // .catch(error => {
        //     console.log(error);
            
        // })
    },

    getOneProduct: (req, res) => {
        Products.findById(req.params.id)
        .then(result => {
            res.send({
                message: "Here's Your Product",
                status: 200,
                result
            })
        })
        .catch(error => {
            console.log(error);
            res.send({
                message: "Product Fetching Failed",
                status: 400
            })
            
        })
    },
    addProduct: (req, res) => {
        const {product_name, description, stock, price} = req.body
        Products.create({
            product_name, 
            description, 
            stock, 
            price
        }, (error, result) => {
            if(error) {
                res.status(400).json({
                    message: "Product Upload Failed"
                })
            } else {
                res.status(200).json({
                    message: "Product Uploaded Successfully",
                    result
                })
            }
        })
    },
    
    updateProduct: async (req, res) => {
        try{
            const updatedProduct = await Products.findByIdAndUpdate(
                {_id: req.params.id},
                {...req.body}
            )
            if(updatedProduct){
                res.status(200).json({
                    message: "Product Updated!",
                    updatedProduct
                })
            } else {
                res.status(400).json({
                    message: "Failed to update product"
                })
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },

    deleteProduct: async (req, res) => {
        try{
            const deleteOneProduct = await Products.findOneAndDelete({
                _id:req.params.id
            })
            if(deleteOneProduct){
                res.status(200).json({
                    message: "Product Deleted!",
                })
            } else {
                res.status(400).json({
                    message: "Product is not deleted"
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