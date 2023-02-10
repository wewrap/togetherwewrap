import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import googleOAuthRouter from './routes/google-oauth';
import testRouter from './routes/test-route'
import prisma from './utils/prismaClient';

const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user: any, done: any) => {
    return done(null, user.id)
})

passport.deserializeUser((user: any, done: any) => {
    return done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async function verify(accessToken: any, refreshToken: any, profile: any, cb: any) {
        // Called On successful authentication

        //find a user that has a matching google ID with the incoming profile ID
        try {
            const user = await prisma.user.findUnique({
                where: {
                    googleID: profile.id
                }
            })

            if (!user) { // if user doesn't exist
                // create a new user and store in database
                const newUser = await prisma.user.create({
                    data: {
                        email: "", 
                        firstName: profile._json.given_name,
                        lastName: profile._json.family_name,
                        password: "",
                        googleID: profile.id
                        //...
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

app.use('/', testRouter)

app.use('/auth/google', googleOAuthRouter)

export default app;