import { type User } from '@prisma/client';
import express from 'express';
import passport from 'passport'
import prisma from '../utils/prismaClient'

const loginAuthRouter = express.Router()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const db = prisma

loginAuthRouter.get('/password',
  function (req, res) {
    res.render('login')
  })

loginAuthRouter.post('/password', passport.authenticate('local'),
  function (req, res) {
    console.log('user from local auth: ' + (req.user as User).id)
    res.redirect('/')
  })

export default loginAuthRouter
