import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, "../.env")});
import app from '../utils/app';
import cors from 'cors';
import prisma from '../utils/db';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import express from 'express';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import crypto from 'crypto'
import mysql from 'mysql2';

const db = prisma;

app.post('/signup', async function(req, res, next) {
    console.log(req.body);
    console.log("hello");
    const salt = crypto.randomBytes(16).toString("base64");
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) { 
        if(err) {
            next(err); 
        }
        const user = await db.user.create({
            data: {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName, 
                hashedPassword: hashedPassword.toString("base64"),
                salt: salt //fix salt ??? how to best generate salt using crypto 
            },
        })
        console.log(user); //redirect to the login page 
    })
    res.send(200);
});

//error caused by emails should be unique but using same email fix error 
// error states, styling forms, fix routes, deicide what needs to be sent back to the client (what's the next step) (reroute to a specific page), 

// app.post('/signup', 
// passport.authenticate('local', {failureRedirect: '/signup', failureMessage: true }),
//  function(req, res) {
//     console.log(req.body)
//  });
