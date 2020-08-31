const express = require('express');
const db = require('./config/db');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')

require('./config/strategies').strategies()

const userRouter = require('./routes/Users')
const cartRouter = require('./routes/Carts')
const imageRouter = require('./routes/Product_Image')
const productRouter = require('./routes/Products')
const transactionRouter = require('./routes/Transactions')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/', userRouter)
app.use('/', cartRouter)
app.use('/', imageRouter)
app.use('/', productRouter)
app.use('/', transactionRouter)

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

//facebook authentication
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook'),
function(req,res){
    console.log(req.user);
    res.json({
        message: "Welcome - Facebook"
    })
})

//google authentication
app.get('/auth/google',
passport.authenticate('google', { scope: ['profile', 'email']}));

app.get('/auth/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
      console.log(req.user);
      
    // Successful authentication, redirect home.
    res.json({
        message: 'Welcome - Google'
    });
  });

  //

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => console.log('We Are Connected'));

app.listen(PORT, ()=> {
    console.log('Connected')
})