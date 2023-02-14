import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import googleOAuthRouter from './routes/googleOAuth';
import testRouter from './routes/testRoute'
import prisma from './utils/prismaClient';
import googleStrategy from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';
import facebookOAuthRouter from './routes/facebookOAuth';

const GoogleStrategy = googleStrategy.Strategy;
const FacebookStrategy = facebookStrategy.Strategy;

const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const secretcode = process.env.SESSION_SECRET as string;
const googleClientID = process.env.GOOGLE_CLIENT_ID as string;
const googleAppSecret = process.env.GOOGLE_APP_SECRET as string;
const facebookClientID = process.env.FACEBOOK_CLIENT_ID as string;
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET as string;

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

passport.deserializeUser(async (incomingId: string, done: any) => {
    const user = await prisma.user.findFirst({
        where: {
            id: incomingId
        }
    })
    return done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleAppSecret,
    callbackURL: "/auth/google/callback"
},
    async function verify(accessToken: any, refreshToken: any, profile: any, cb: any) {
        // Called On successful authentication
        // //find a user that has a matching google ID with the incoming profile ID
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

passport.use(new FacebookStrategy({
    clientID: facebookClientID,
    clientSecret: facebookAppSecret,
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email'],
    enableProof: true
},
    async function verify(accessToken: any, refreshToken: any, profile: any, cb: any) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    facebookID: profile.id
                }
            })

            if (!user) { // if user doesn't exist
                // create a new user and store in database
                const newUser = await prisma.user.create({
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
    }
));

app.use('/', testRouter)

app.use('/auth/google', googleOAuthRouter)

app.use('/auth/facebook', facebookOAuthRouter)

export default app;