import express from "express";
import passport from 'passport'
import prisma from '../utils/prismaClient'

const loginAuthRouter = express.Router()
const db = prisma;

loginAuthRouter.get('/password',
    function (req, res, next) {
        res.render('login');
    });

loginAuthRouter.post('/password',
    passport.authenticate('local', {failureRedirect: '/login', failureMessage: 'Email or password did not match. Please try again.'}),
    function (req, res) {
        console.log(req.body)
        res.status(200).send("we logged in")
    });

export default loginAuthRouter
