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
    passport.authenticate('local', {failureMessage: true}),
    function (req, res) {
        console.log(req.body)
        res.status(200).send("we logged in")
    });

export default loginAuthRouter
