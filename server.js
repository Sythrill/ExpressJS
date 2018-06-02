const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config');
const app = express();
let googleProfile = {};

app.set('view engine', 'pug');
app.set('views', './views');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, cb) {
        googleProfile = {
            id: profile.id,
            displayName: profile.displayName
        }
        cb(null, profile);
    }
));

app.get('/login', function (req, res) {
    res.render('login', {user: req.user});
});

app.get('/user', function (req, res) {
    res.render('user', {user: googleProfile.displayName});
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/user',
        failureRedirect: '/login'
    }));

app.listen(3000);

