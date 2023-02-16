import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, "../.env")});
import app from './utils/app';
import cors from 'cors';
import prisma from './utils/db';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import express from 'express';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import crypto from 'crypto'
import mysql from 'mysql2';


app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const db = prisma; 

app.get('/feed', async (req, res) => {
    const allUsers = await db.user.findMany()
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

const port = 8000;

app.listen(8000, () => {
    console.log(`Server started: http://localhost:${port}/`);
}); 

export default prisma;
