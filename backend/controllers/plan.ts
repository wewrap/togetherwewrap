import PlanService from '../service/plan'
import PlanMembership from '../service/planMembership'
import { type NextFunction } from 'express'

export const createPlan = async (req: any, res: any, next: NextFunction): Promise<void> => {
  try {
    const {
      description,
      startDate,
      endDate,
      eventType
    } = req.body

    const planData = {
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      specialEventType: eventType
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

export const fetchPlan = async (req: any, res: any, next: NextFunction): Promise<void> => {
  const planID = req.params.id

  try {
    const planRecord = await PlanService.fetchPlanData(planID)

    if (planRecord === null) throw new Error(`unable to fetch plan ${planID}`)

    res.status(200).send(planRecord)
  } catch (err) {
    console.error(`Controller failure: ${err}`)
  }
}
