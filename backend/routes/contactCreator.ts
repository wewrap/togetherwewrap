/* eslint-disable @typescript-eslint/no-misused-promises */
import { type User } from '@prisma/client'
import express from 'express'
import prisma from '../utils/prismaClient'

const contactCreatorRouter = express.Router()
const db = prisma

contactCreatorRouter.post('/', async function (req, res) {
    console.log(req.body)
    try {
        const contact = await db.contact.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                notes: req.body.notes,
                ownerID: (req.user as User).id,
                source: req.body.source
            }
        })
        await db.userContactRelationship.createMany({
            data: req.body.relationships.map((relationship: { relationshipType: any }) => ({
                relationshipType: relationship.relationshipType,
                contactID: contact.id
            }))
        })
        await db.importantDateEvent.createMany({
            data: req.body.importantDates.map((importantDate: { date: any, eventType: any }) => ({
                date: importantDate.date,
                eventType: importantDate.eventType,
                contactID: contact.id
            }))
        })
        const newContact = await db.contact.findUnique({
            where: { id: contact.id },
            include: {
                relationships: true,
                importantDateEvent: true
            }
        })
        res.status(200).send({ contact: newContact })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Failed to create contact' })
    }
})
export default contactCreatorRouter
