import { type User } from '@prisma/client';
import express from 'express';
import passport from 'passport'
const loginAuthRouter = express.Router()

loginAuthRouter.get('/password',
  function (req, res, next) {
    res.render('login')
  })

loginAuthRouter.post('/password', passport.authenticate('local'),
  function (req, res) {
    console.info('user from local auth: ' + (req.user as User).id);
    res.redirect('/');
  });

export default loginAuthRouter
