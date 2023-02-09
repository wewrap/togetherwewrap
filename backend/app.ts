import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const prisma = new PrismaClient()

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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        // Called On successful authentication
        // Insert User to Database
        cb(null, profile)
    }));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/');
    });


app.get('/feed', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    res.json(allUsers)
})

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.get('/api', (req, res) => {
    res.status(200).json({
        data: "Together we wrap!"
    })
})

export default app;