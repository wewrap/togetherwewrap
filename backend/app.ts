import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import googleOAuthRouter from './routes/googleOAuth';
import testRouter from './routes/testRoute'
import prisma from './utils/prismaClient';
import loginAuth from './routes/loginAuth'
import googleStrategy from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
dotenv.config();
const GoogleStrategy = googleStrategy.Strategy;

const db = prisma;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const secretcode = process.env.SESSION_SECRET as string;
const clientID = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

app.use(session({
    secret: secretcode,
    resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user: any, done: any) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id: string, done: any) => {
    const user = await db.user.findFirst({
        where: {
            id: id
        }
    })
    console.log('found user from cookie')
    return done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "/auth/google/callback"
},
    async function verify(accessToken: any, refreshToken: any, profile: any, cb: any) {
        // Called On successful authentication
        // //find a user that has a matching google ID with the incoming profile ID
        try {
            const user = await db.user.findUnique({
                where: {
                    googleID: profile.id
                }
            })

            if (!user) { // if user doesn't exist
                // create a new user and store in database
                const newUser = await db.user.create({
                    data: {
                        firstName: profile._json.given_name,
                        lastName: profile._json.family_name,
                        googleID: profile.id,
                        email: profile.emails[0].value
                    }
                })
                // return user object
                cb(null, newUser)
            } else {
                cb(null, user)
            }
        } catch (error) {
            cb(error, null)
        }
    }));

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
                return done(null, false, {message: 'Email or password did not match. Please try again.'});
            }

            const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256').toString('hex');
            if (user.password !== hashedPassword) {
                return done(null, false, {message: 'Email or password did not match. Please try again.'});
            }

            return done(null, user);

        } catch (error) {
            done(error);
        }
    }));

app.use('/', testRouter)
app.use('/auth/google', googleOAuthRouter)
app.use('/login', loginAuth)

export default app;
