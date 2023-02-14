import express from "express";
const facebookOAuthRouter = express.Router()
import passport from 'passport'

facebookOAuthRouter.get('/',
    passport.authenticate('facebook'));

facebookOAuthRouter.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

export default facebookOAuthRouter