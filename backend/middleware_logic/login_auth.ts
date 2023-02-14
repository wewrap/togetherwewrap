import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, "../.env")});
import express from 'express';
// import { PrismaClient } from '@prisma/client'
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import crypto from 'crypto';
import {prisma} from './index';

const app = express();

app.get('/login/password',
  function(req, res, next) {
    res.render('login');
  });

app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    console.log(req.body)
    res.status(200).send("we logged in")
  });

  passport.use(new LocalStrategy(async (username: string, password: string, done: Function) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email:username
        },
      });

      if (!user) {
        return done(null, false, {message: 'Incorrect username or password.' });
      }

      const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256').toString('hex');
      if (user.password !== hashedPassword) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      return done(null, user);

    } catch (error) {
      done(error);
    }
  }));