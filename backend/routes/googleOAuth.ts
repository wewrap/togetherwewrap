import express from 'express'
import passport from 'passport'
import { redirectURL } from '../utils/config'
const googleOAuthRouter = express.Router()

// route prefix: /auth/google

googleOAuthRouter.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }))

googleOAuthRouter.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${redirectURL}/hub`)
  })

export default googleOAuthRouter
