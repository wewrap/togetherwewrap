import express from 'express';
import passport from 'passport'
const facebookOAuthRouter = express.Router()

facebookOAuthRouter.get('/',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

facebookOAuthRouter.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export default facebookOAuthRouter
