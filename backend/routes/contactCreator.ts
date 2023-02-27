import express from 'express';
import crypto from 'crypto';
import prisma from '../utils/prismaClient'

const contactCreatorRouter = express.Router();
const db = prisma;

contactCreatorRouter.post('/contacts', async function(req, res, next) {
    const salt = crypto.randomBytes(16).toString("base64");
    crypto.pbkdf2(req.body.address, salt, 310000, 32, 'sha256', async function(err, hashedAddress) {
        if(err) {
            next(err);
        }
        try {
            const contact = await db.user.create({
                data: {
                    fullName: req.body.fullName,
                    relationship: req.body.relationship,
                    importantDate: req.body.importantDate,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    address: hashedAddress.toString("base64"),
                    notes: req.body.notes,
                    salt
                },
            })
            res.status(200).send({contact});
        } catch(error) {
            console.error(error);
            res.status(500).send({message: 'Failed to create contact' });
        }
    })
});

export default contactCreatorRouter;
