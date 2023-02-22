import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import googleOAuthRouter from './routes/googleOAuth';
import testRouter from './routes/testRoute'
import prisma from './utils/prismaClient';
import signUpAuth from './routes/signUpAuth';
import googleStrategy from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';
import facebookOAuthRouter from './routes/facebookOAuth';
import loginAuth from './routes/loginAuth'
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
import { secretcode, googleClientID, googleClientSecret, facebookAppSecret, facebookClientID } from './utils/config'

const GoogleStrategy = googleStrategy.Strategy;
const FacebookStrategy = facebookStrategy.Strategy;

const app = express();
dotenv.config();
const db = prisma;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(session({
    secret: secretcode,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3//3 days
    }
}));

app.use(passport.initialize())
app.use(passport.session())
app.use('/', testRouter)
app.use('/auth/google', googleOAuthRouter)
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
    callbackURL: "/auth/google/callback"
},
    async function verify(accessToken: any, refreshToken: any, profile: any, cb: any) {
        try {
            const user = await db.user.findUnique({
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
    callbackURL: "http://localhost:8000/auth/facebook/callback",
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


app.use('/', testRouter)
app.use('/auth/google', googleOAuthRouter)
app.use('/auth/facebook', facebookOAuthRouter)
app.use('/login', loginAuth)
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
