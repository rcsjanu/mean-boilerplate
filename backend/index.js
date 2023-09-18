const express = require('express');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/database');
const userRoute = require('./routes/users.route');
const passportauth = require('./config/passport');
require('dotenv').config();

//Connect database 
dbConnect;

const app = express();

// CORS Middleware
app.use(cors());

//Body-parser Middleware 
app.use(bodyParser.json());

//Passport Middleware 
app.use(passport.initialize());
// app.use(passport.session);
require('./config/passport')(passportauth);


app.get('/', (req, res) => {
    res.send("Welcome to MEAN Auth App")
})

app.use('/users', userRoute);

app.listen(process.env.PORT, () => {
    console.log("MEAN Auth App Server Started on port : " + process.env.PORT)
});