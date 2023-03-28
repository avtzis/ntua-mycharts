require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const passport = require('passport')
const User = require("./models/user.models");
const session = require('express-session');


const app = express()
const port = 3000

const GoogleStrategy = require('passport-google-oauth20').Strategy;

mongoose.connect('mongodb://127.0.0.1:27017/mycharts');

app.use(session({ secret: 'melody hensley is my spirit animal' }));


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
app.use(passport.initialize())
app.use(passport.session())
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
app.get('/secret',authenticationMiddleware()
,(req, res) => {
    res.send(req.user)
})

app.get('/login',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})