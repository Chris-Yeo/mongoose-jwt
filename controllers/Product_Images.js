const Product_Images = require('../models/Product_Images')
const Products = require('../models/Products')

module.exports = {
    getAllImages: async(req, res) => {
        try{
            const images = await Product_Images.find({})
            .populate({path:'id_product', select: 'product_name price'})
            if(images) {
                res.status(200).json({
                    message: "Here Are The Images",
                    data: images
                })
            } else {
                res.status(400).json({
                    message: "Image Fetching Failed"
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

    getOneImage: async(req, res) => {
        try {
            const imageOne = await Product_Images.findById(req.params.id)
            .populate({path:'id_product', select: 'product_name price'})
            if(imageOne){
                res.status(200).json({
                    message: "Here's The Image You Requested",
                    data: imageOne
                })
            } else {
                res.status(400).json({
                    message: "Image Fetching Failed"
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

    addImage: async(req, res) => {
        try {
           
            const newImage = await Product_Images
            .create({
                ...req.body
            })
            const product = await Products.findOneAndUpdate(
                {_id: req.body.id_product},
                {$push: {images: newImage._id}},
                {new: true}
            )
            res.status(200).send({
                message: 'Image Added',
                product
            })
        }
        catch(error) {
            console.log(error);
            res.send({
                message: "Internal Server Error",
                status: 500
            })
            
        }
    }
}