/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { EventType } from '@prisma/client'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { createPlan, fetchPlan } from '../controllers/plan'
const planRouter = express.Router()

planRouter.post('/',
  body('description').isString(),
  body('startDate').isString(),
  body('startDate').isString(),
  body('endDate').isString(),
  body('eventType').isIn(Object.values(EventType)),
  body('friends').isArray(),
  handleInputErrors,
  createPlan)

planRouter.get('/:id', fetchPlan)
export default planRouter
