import express from "express";
const googleOAuthRouter = express.Router()
import passport from 'passport'

// route prefix: /auth/google

googleOAuthRouter.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

googleOAuthRouter.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/tempLandingPage');
    });

export default googleOAuthRouter
