require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const User = require("./models/user.models");
const session = require('express-session');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express()
const port = 3001
const {authorization,authentication} = require('./helpers/auth');
const userRouter = require('./routes/user.routes');

const cors = require('cors');

const corsOptions = {
    credentials: true,
    origin: function(origin, callback) {
            callback(null, true)
    }
}
app.use(cors(corsOptions));




app.use(express.json());

app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/mycharts');


//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
function authenticationMiddleware () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.send("Not authenticated :(")
    }
}
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/secret', authorization,(req, res) => {
    res.send(req.userId)
})
app.get('/user', authorization,userRouter);

app.post('/login',async (req, res) => {

    const googleToken = req.body.token;

    const user = await authentication(googleToken);




    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_TOKEN_KEY,
        {
            expiresIn: "24h",
        }
    );


    return res
        .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'None',
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });


});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})