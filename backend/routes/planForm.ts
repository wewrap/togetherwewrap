/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import prisma from '../utils/prismaClient'
import { EventType, type User } from '@prisma/client'
const planFormRouter = express.Router()
const db = prisma

planFormRouter.post('/', async (req, res) => {
  const {
    description,
    startDate,
    endDate
  } = req.body

  console.log(req.body)

  try {
    const plan = await db.plan.create({
      data: {
        specialEventType: EventType.ACHIEVEMENT,
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
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err) res.status(400).end()
  }
})

export default planFormRouter
