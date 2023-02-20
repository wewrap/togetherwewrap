import express from 'express';
import crypto from 'crypto'
import * as dotenv from 'dotenv';
import prisma from '../utils/prismaClient';

dotenv.config();
const signUpAuthRouter = express.Router()
const db = prisma;

signUpAuthRouter.post('/', async function(req, res, next) {
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

export default signUpAuthRouter