import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, "../.env")});
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import morgan from 'morgan';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import crypto from 'crypto'
import * as mysql from 'mysql2';

const app = express();

const prisma = new PrismaClient()


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

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
passport.use(new LocalStrategy(function verify(username:any, password:any, cb:any) {
    connection.query('SELECT * FROM users WHERE username = ?', [ username ], function(err:any, user:any) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err:any, hashedPassword:any) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
      });
    });
  }));
  connection.end()