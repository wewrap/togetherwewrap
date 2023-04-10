import PlanService from '../service/plan'
import PlanMembership from '../service/planMembership'
import { type NextFunction } from 'express'

export const createPlan = async (req: any, res: any, next: NextFunction): Promise<void> => {
  try {
    const {
      description,
      startDate,
      endDate,
      EventType
    } = req.body

    const planData = {
      description,
      startDate,
      endDate,
      EventType
    }
    const planRecord = await PlanService.initiatePlan(planData)

    if (planRecord === undefined) throw new Error('initiate plan failed')

    const membershipData = {
      friends: req.body.friends,
      userID: req.user?.id,
      planID: planRecord?.id
    }

    const planMembershipRecord = await PlanMembership.initiatePlanMembership(membershipData)

    if (planMembershipRecord.length !== 2) throw new Error('initate plan membership failed')

    res.status(201)
  } catch (err) {
    console.error('error in create plan', err)
    // placeholder for error handling
    res.status(400).send(' error')
  }
}
