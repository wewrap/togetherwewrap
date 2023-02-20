import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, "../.env")});
import cors from 'cors';
import prisma from '../utils/prismaClient';
import morgan from 'morgan';
import express from 'express';
import app from '../app';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import crypto from 'crypto'
import mysql from 'mysql2';

const db = prisma;

app.post('/signup', async function(req, res, next) {
    console.log(req.body);
    console.log("hello");
    const existingUser = await db.user.findUnique({
        where: {    
            email: req.body.email
        }
    });
    
    if (existingUser){
        res.status(409).send('Existing email. Please use a different email.')
    }
    else {
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
                    password: hashedPassword.toString("base64"),
                    salt 
                },
            })
            console.log(user); //redirect to the login page 
        })
        res.status(200);
    }
});
