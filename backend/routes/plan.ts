/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { EventType } from '@prisma/client'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { PlanController } from '../controllers/plan'
const planRouter = express.Router()

planRouter.post('/',
  body('description').isString(),
  body('startDate').isString(),
  body('startDate').isString(),
  body('endDate').isString(),
  body('title').isString(),
  body('contact').isObject(),
  body('eventType').isIn(Object.values(EventType)),
  handleInputErrors,
  PlanController.createPlan)

planRouter.get('/:id', PlanController.fetchPlan)

planRouter.get('/',
  PlanController.fetchAllPlans)

export default planRouter
