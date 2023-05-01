import express from 'express';
import crypto from 'crypto'
import prisma from '../utils/prismaClient';
const signUpAuthRouter = express.Router()
const db = prisma;

signUpAuthRouter.post('/', async function (req, res, next) {
  const existingUser = await db.user.findUnique({
    where: {
      email: req.body.email
    }
  });

  if (existingUser) {
    res.status(409).send('Existing email. Please use a different email.')
  } else {
    // TODO: Abstract this sign up logic with a service & model
    const salt = crypto.randomBytes(16).toString('base64');
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      const user = await db.user.create({
        data: {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: hashedPassword.toString('base64'),
          salt
        }
      })
    })
    res.status(200).send('Successful Submission');
  }
});

export default signUpAuthRouter
