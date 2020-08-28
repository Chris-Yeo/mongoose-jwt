const Users = require('../models/Users')

const {createToken} = require('../helpers/token')

module.exports = {
    getAllUsers: (req, res) => {
        Users.find({})
        .then(result => {
            res.status(200).json({
                message: 'All Users',
                result
            })
        })
    },

    getOneUser: async(req, res) => {
        try{
            // const oneUser = await Users.findOne({
            //     where: {_id = req.params.id}
            // })
            const oneUser = await Users.findById(req.params.id)
            if(oneUser){
                res.status(200).json({
                    message: "Here is Your Profile",
                    oneUser
                })
            } else {
                res.status(400).json({
                    message: "Failed to fetch Profile"
                })
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
            
        }
        // Users.findOne({
        //     raw:true,
        //     where: {_id: req.params.id}
        // })
        // .then(result => {
        //     res.send({
        //         message: "Here is Your Profile",
        //         status: 200,
        //         result
        //     })
        // })
        // .catch(error => {
        //     console.log(error);
        //     res.status(400).json({
        //         message: "Profile Request Failed"
        //     })
        // })
    },
    addUser: (req, res) => {
        const {
            fullname,
            username,
            email,
            phone,
            password,
            address
        } = req.body
        Users.create({
            fullname,
            username,
            email,
            phone,
            password,
            address
        },(error, result) => {
            if(error) {
                res.status(400).json({
                    message: 'Error Creating Profile'
                })
            } else {
                res.status(200).json({
                    message: 'Profile Created!',
                    result
                })
            }
        })
    },
    login: async (req, res) => {
        try {
            const registeredUser = await Users.findOne({email:req.body.email})
            console.log(registeredUser)
            console.log(registeredUser.password)
            console.log(req.body.password)
            if(registeredUser.password !== req.body.password) {
                res.status(400).json({
                    message: "Invalid Password",
                })
            } else {
                const dataUser = {
                    id: registeredUser._id,
                    username: registeredUser.username,
                    email: registeredUser.email
                }
                const token = createToken(dataUser)
                console.log(token);
                res.status(200).json({
                    message: "Logged In Succesfully",
                    token,
                    user: dataUser
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

    updateUser: async (req, res) => {
        try{
            const updatedUser = await Users.findOneAndUpdate(
                {_id: req.params.id},
                {...req.body}
            )
            if(updatedUser){
                res.status(200).json({
                    message: "Profile Updated!",
                    updatedUser
                })
            } else {
                res.status(400).json({
                    message: "Profile can't be deleted"
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

    deleteUser: async (req, res) => {
        try{
            const deleteOneUser = await Users.findOneAndDelete({
                _id: req.params.id
            })
            if(deleteOneUser){
                res.status(200).json({
                    message: "User Deleted!",
                    deleteOneUser
                })
            } else {
                res.status(400).json({
                    message: "Cannot delete user"
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