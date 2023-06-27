import { type Response, type NextFunction, type Request } from 'express';
import PlanService from '../service/plan'
import PlanMembership from '../service/planMembership'
import { type GeneralPlanData } from '../utils/types'
import { InviteStatus, Role, type User } from '@prisma/client';

export class PlanController {
  static async createPlan(req: any, res: any, next: NextFunction): Promise<void> {
    try {
      const {
        description,
        startDate,
        endDate,
        title,
        eventType,
        contact
      } = req.body

      const planData = {
        title,
        description,
        contactID: contact.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        specialEventType: eventType
      }
      const planRecord = await PlanService.createPlan(planData)

      if (planRecord === null) throw new Error('initiate plan failed')

      const planMembershipRecord = await PlanMembership.initiatePlanMembership(
        req.user, planRecord.id, Role.PLAN_LEADER, InviteStatus.ACCEPTED
      )

      if (planMembershipRecord === null) throw new Error('initiate plan membership failed')

      res.status(201).json({ message: 'plan created', data: { planRecord, planMembershipRecord } })
    } catch (error) {
      console.error('error in create plan', error)
      // placeholder for error handling
      res.status(400).json({ message: 'error in create plan', error })
    }
  }

  static async fetchPlan(req: any, res: any, next: NextFunction): Promise<void> {
    const planID = req.params.id

    try {
      const planRecord: GeneralPlanData | null = await PlanService.fetchPlanData(planID)

      if (planRecord === null) throw new Error(`unable to fetch data for planID ${planID}`)

      res.status(200).json(planRecord)
    } catch (err) {
      console.info(`Controller failure: ${err}`)
      res.status(400).json({
        error: `unable to fetch data for planID ${planID}`
      })
    }
  }

  static async fetchAllPlans(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user as User
      const plans = await PlanService.fetchAllPlansData(user)

      res.status(200).json(plans)
    } catch (error) {
      res.status(400).json({ message: 'Error retrieving all plans', error })
    }
  }
}
