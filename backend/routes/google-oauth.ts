import express from "express";
const googleOAuthRouter = express.Router()
import passport from 'passport'

googleOAuthRouter.get('/',
    passport.authenticate('google', { scope: ['profile'] }));

googleOAuthRouter.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/');
    });

export default googleOAuthRouter
