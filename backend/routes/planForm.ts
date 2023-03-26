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

  const plan = await db.plan.create({
    data: {
      specialEventType: EventType.ACHIEVEMENT,
      description,
      endDate,
      startDate
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const planMembership = await db.planMembership.create({
    data: {
      role: 'PLAN_LEADER',
      inviteStatus: 'NOT_APPLICABLE',
      userID: (req.user as User).id,
      planID: plan.id
    }
  })
})

export default planFormRouter
