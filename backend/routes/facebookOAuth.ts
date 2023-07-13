import express from 'express';
import passport from 'passport'
import { redirectURL } from '../utils/config'

const facebookOAuthRouter = express.Router()

facebookOAuthRouter.get('/',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

facebookOAuthRouter.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${redirectURL}/`);
  });

export default facebookOAuthRouter
