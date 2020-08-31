const passport = require('passport')

const jwtAuth = (req, res, next) => {
    try{
        //err = error, user = not error, info = ambil dari strategies.js which is 'user not found'
        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            if(err){
                return next(err)
            }
            if(!user){
                return res.json({
                    message: info.message
                })
            }
            next()
        })(req, res, next)
    }
    catch(error){
        console.log(error);
        return res.json({
            message: "Internal Server Error"
        })
        
    }
}
module.exports = {
    jwtAuth
}