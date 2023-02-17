import express from "express";
const loginAuthRouter = express.Router()
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport'
import prisma from '../utils/prismaClient'
import crypto from 'crypto';

const db = prisma;

loginAuthRouter.get('/password',
    function (req, res, next) {
        res.render('login');
    });

loginAuthRouter.post('/password',
    passport.authenticate('local', { failureMessage: true }),
    function (req, res) {
        console.log(req.body)
        res.status(200).send("we logged in")
    });

passport.use(new LocalStrategy(async (email: string, password: string, done: Function) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            },
        });

        if (!user || !user.salt) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256').toString('hex');
        if (user.password !== hashedPassword) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);

    } catch (error) {
        done(error);
    }
}));

export default loginAuthRouter