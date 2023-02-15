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
import mysql from 'mysql2';
import app from '../utils/app';
import prisma from '../utils/db';

const db = prisma; 

app.post('/signup', 
passport.authenticate('local', {failureRedirect: '/signup', failureMessage: true }),
 function(req, res) {
    console.log(req.body)
 });


// same email, redirect the if email is used the same

//internet goes out
 

