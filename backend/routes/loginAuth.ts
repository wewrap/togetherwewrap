import express from 'express';
import passport from 'passport'
import { redirectURL } from '../utils/config'
const loginAuthRouter = express.Router()

loginAuthRouter.get('/password',
  function (req, res) {
    res.render('login')
  })

loginAuthRouter.post('/password', passport.authenticate('local'),
  function (req, res) {
    res.redirect(`${redirectURL}/`)
  })

export default loginAuthRouter
