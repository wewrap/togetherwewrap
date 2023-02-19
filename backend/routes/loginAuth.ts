import express from "express";
import passport from 'passport'
import prisma from '../utils/prismaClient'

const loginAuthRouter = express.Router()
const db = prisma;

loginAuthRouter.get('/password',
    function (req, res, next) {
        res.render('login');
    });

loginAuthRouter.post("/password", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
          // Replace this with Error Message
        return res.status(401).send('OOPPPs')
      }
      if (!user) {
          // Replace this with Error Message
        return res.status(401).send('OOPS');
      }
  
      // NEED TO CALL req.login()!!!
      req.login(user, next);
    })(req, res, next);
  });

export default loginAuthRouter
