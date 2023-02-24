import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import googleOAuthRouter from './routes/googleOAuth';
import testRouter from './routes/testRoute'
import prisma from './utils/prismaClient';
import signUpAuth from './routes/signUpAuth';
import googleStrategy from 'passport-google-oauth20';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
import { secretcode, googleClientID, googleClientSecret, facebookAppSecret, facebookClientID, facebookCallBackURL, googleCallBackURL} from './utils/config'
import facebookStrategy from 'passport-facebook';
import facebookOAuthRouter from './routes/facebookOAuth';
import loginAuth from './routes/loginAuth'
const GoogleStrategy = googleStrategy.Strategy;
const FacebookStrategy = facebookStrategy.Strategy;
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const db = prisma;
const THREE_DAYS = 1000 * 60 * 60 * 24 * 3
const TWO_MINUTES = 1000 * 60 * 2

app.use(morgan("dev"));
app.use(express.json());

app.use(
    expressSession({
        cookie: {
            maxAge: THREE_DAYS
        },
        secret: secretcode,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: TWO_MINUTES,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        ),
    })
);

app.use(passport.initialize())
app.use(passport.session())
app.use('/', testRouter)
app.use('/auth/google', googleOAuthRouter)
app.use('/auth/facebook', facebookOAuthRouter)
app.use('/login', loginAuth)
app.use('/signup', signUpAuth)

passport.serializeUser((user: any, done: any) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id: string, done: any) => {
    const user = await db.user.findFirst({
        where: {
            id: id
        }
    })
    return done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: googleCallBackURL
},
    async function verify(accessToken: any, refreshToken: any, profile: any, cb: any) {
        try {
            const user = await db.user.findFirst({
                where: {
                    googleID: profile.id
                }
            })

            if (!user) {
                const newUser = await db.user.create({
                    data: {
                        firstName: profile._json.given_name,
                        lastName: profile._json.family_name,
                        googleID: profile.id,
                        email: profile.emails[0].value
                    }
                })

                cb(null, newUser)
            } else {
                cb(null, user)
            }
        } catch (error) {
            cb(error, null)
        }
    }));

passport.use(new FacebookStrategy({
    clientID: facebookClientID,
    clientSecret: facebookAppSecret,
    callbackURL: facebookCallBackURL,
    profileFields: ['id', 'displayName', 'email'],
    enableProof: true
},
    async function verify(accessToken: any, refreshToken: any, profile: any, cb: any) {
        try {
            const user = await db.user.findFirst({
                where: {
                    facebookID: profile.id
                }
            })

            if (!user) {
                const newUser = await db.user.create({
                    data: {
                        firstName: profile._json.name,
                        lastName: profile._json.name,
                        facebookID: profile._json.id,
                        email: profile._json.email
                    }
                })
                cb(null, newUser)
            } else {
                cb(null, user)
            }
        } catch (error) {
            cb(error, null)
        }
    }
));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email: string, password: string, done: Function) => {
        try {
            const user = await db.user.findUnique({
                where: {
                    email
                },
            });

            if (!user || !user.salt) {
                return done('Email or password did not match. Please try again.');
            }

            const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256').toString('base64');
            if (user.password !== hashedPassword) {
                return done('Email or password did not match. Please try again.');
            }

            return done(null, user);

        } catch (error) {
            done(error);
        }
    }));

export default app;
