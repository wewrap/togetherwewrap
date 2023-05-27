import express from 'express'
import passport from 'passport'
import { port } from '../utils/config'
const googleOAuthRouter = express.Router()

// route prefix: /auth/google

googleOAuthRouter.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }))

googleOAuthRouter.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:${port}/hub`)
  })

export default googleOAuthRouter
