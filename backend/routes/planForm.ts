/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import prisma from '../utils/prismaClient'
import { type User, InviteStatus, Role, EventType } from '@prisma/client'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { createPlan } from '../controllers/plan'
const planFormRouter = express.Router()
const db = prisma

planFormRouter.post('/',
  body('description').isString(),
  body('startDate').isString(),
  body('startDate').isString(),
  body('endDate').isString(),
  body('EventType').isIn(Object.values(EventType)),
  body('friends').isArray(),
  handleInputErrors, 
  createPlan)

export default planFormRouter
