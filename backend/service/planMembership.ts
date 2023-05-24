import { type User } from '@prisma/client';
import PlanMembershipModel from '../models/planMembership';

export default class PlanMembership {
  // TODO: add a type for data
  public static async initiatePlanMembership(data: any): Promise<any> {
    try {
      const leaderPlanMembership = await PlanMembershipModel.dbCreateOnePlanMembership(data)
      const friendsPlanMembership = await PlanMembershipModel.dbCreateManyPlanMembership(data)

      if (leaderPlanMembership === undefined || friendsPlanMembership === undefined) {
        throw new Error('plan membership model failed')
      }

      return [leaderPlanMembership, friendsPlanMembership]
    } catch (err) {
      console.error(`failed to initiatePlanMembership ${err}`)
    }
  }

  public static async getPlanMembers(planID: string): Promise<User[]> {
    try {
      const planMembers = await PlanMembershipModel.dbReadPlanMembers({ planID })

      if (planMembers === undefined || planMembers === null) throw new Error('plan membership model failed')

      const memberList = planMembers.map(
        (planMember:
        (PlanMembership & {
          user: User
        })
        ) => planMember.user)

      return memberList
    } catch (err) {
      console.error(`failed to getPlanMembers ${err}`)
      throw new Error(err as string)
    }
  }
}
