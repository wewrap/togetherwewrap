import express from 'express';
import crypto from 'crypto';
import prisma from '../utils/prismaClient'

const contactCreatorRouter = express.Router();
const db = prisma;

contactCreatorRouter.post('/contacts', async function (req, res, next) {

}

export default contactCreatorRouter;
