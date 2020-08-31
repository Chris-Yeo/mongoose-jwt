const passport = require('passport');
require('dotenv').config()
const Users = require('../models/Users')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = {
    strategies: () => {
        passport.use('jwt', new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromUrlQueryParameter('secret_token'),
                ExtractJwt.fromHeader('secret_token'),
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: process.env.SECRET_KEY_TOKEN
        },
        async(jwt_payload, done) => {
            try{
                const user = await Users.findOne({email: jwt_payload.email});
                if(!user){
                    return done(err, false, {message:'User Not Found'})
                } else {
                    return done(null, user)
                }
            }
            catch(err) {
                console.log(err);
                res.status(500).json({
                    message: "Internal Server Error"
                }) 
            }
        }))

        passport.use('facebook', new FacebookStrategy ({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            profileFields:['id', 'displayName', 'photos', 'email']
        },
        (accessToken, refreshToken, profile, callback) => {
            Users.findOrCreate({
                providerId: profile.id,
                provider: profile.provider,
                fullname: profile.displayName,
                email: profile._json.email
            }, (err, user) => {
                return callback(err, user)
            })
        })),

        passport.use('google', new GoogleStrategy ({
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: process.env.callbackURL
        },
        (accessToken, refreshToken, profile, callback) => {
            console.log(accessToken, refreshToken, profile, callback)
            Users.findOrCreate({
                providerId: profile.id,
                provider: profile.provider,
                fullname:  profile._json.name,
                email: profile._json.email
            }, (err, user) => {
                return callback(err, user)
            })
        }
        )),
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
        passport.deserializeUser(function(id, done) {
            Users.findById(id, function(err, user) {
                done(err, user)
            })
        })
    }
}