/* eslint-disable @typescript-eslint/no-misused-promises */
import { type User } from '@prisma/client'
import express from 'express'
import prisma from '../utils/prismaClient'

const contactCreatorRouter = express.Router()
const db = prisma

contactCreatorRouter.post('/', async function (req, res) {
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
        for (const relationship of req.body.relationships) {
            await db.userContactRelationship.create({
                data: {
                    relationshipType: relationship.type,
                    contact: { connect: { id: contact.id } }
                }
            })
        }
        for (const importantDate of req.body.importantDates) {
            await db.importantDateEvent.create({
                data: {
                    date: importantDate.date,
                    eventType: importantDate.event,
                    contact: { connect: { id: contact.id } }
                }
            })
        }
        res.status(200).send({ contact })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Failed to create contact' })
    }
})
export default contactCreatorRouter
