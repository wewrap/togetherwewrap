import express from "express";
const facebookOAuthRouter = express.Router()
import passport from 'passport'

facebookOAuthRouter.get('/',
    passport.authenticate('facebook', {scope: ['email', 'public_profile']}));

facebookOAuthRouter.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/');
    });

export default facebookOAuthRouter