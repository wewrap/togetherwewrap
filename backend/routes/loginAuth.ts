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
    console.log('done authenticating...')
    console.log('attempting to redirect...')
    res.redirect(`${redirectURL}/`)
  })

export default loginAuthRouter
