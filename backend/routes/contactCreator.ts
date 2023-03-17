import { User } from '@prisma/client';
import express from 'express';
import prisma from '../utils/prismaClient'

const contactCreatorRouter = express.Router();
const db = prisma;

contactCreatorRouter.post('/', async function (req, res, next) {
    console.log(req.user);
    try {
        const contact = await db.contact.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                relationships: req.body.relationships,
                importantDates: req.body.importantDates,
                notes: req.body.notes,
                ownerID: (req.user as User).id,
                source: req.body.source,
            },
        });
        // console.log(contact.ownerID);
        res.status(200).send({ contact });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to create contact' });
    }
});
export default contactCreatorRouter;