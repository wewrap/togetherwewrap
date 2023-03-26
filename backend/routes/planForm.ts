/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import prisma from '../utils/prismaClient'
import { type User } from '@prisma/client'
const planFormRouter = express.Router()
const db = prisma

planFormRouter.post('/', async (req, res) => {
  const {
    description,
    startDate,
    endDate,
    EventType,
    friends
  } = req.body

  try {
    const plan = await db.plan.create({
      data: {
        specialEventType: EventType,
        description,
        endDate: new Date(endDate),
        startDate: new Date(startDate)
      }
    })

    await db.planMembership.create({
      data: {
        role: 'PLAN_LEADER',
        inviteStatus: 'NOT_APPLICABLE',
        userID: (req.user as User).id,
        planID: plan.id
      }
    })
    // create plan membership invitation to friends
    await db.planMembership.createMany({
      data: [friends]
    })
  } catch (err) {
    res.status(400).send('Invalid form submission')
  }
})

export default planFormRouter
