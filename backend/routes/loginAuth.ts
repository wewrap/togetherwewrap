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
        return res.status(401).send('Email or password did not match. Please try again.')
      }
      if (!user) {
        return res.status(401).send('Email or password did not match. Please try again.');
      }
      req.login(user, next);
      res.status(200).send('Sucessfully logged in')
    })(req, res, next);
  });


export default loginAuthRouter
