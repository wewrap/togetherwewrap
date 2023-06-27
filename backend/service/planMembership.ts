import { type InviteStatus, type Role, type User } from '@prisma/client';
import PlanMembershipModel from '../models/planMembership';

export default class PlanMembership {
  // TODO: add a type for data
  public static async initiatePlanMembership(user: User, planID: string, role: Role, inviteStatus: InviteStatus): Promise<PlanMembership | null> {
    try {
      const leaderPlanMembership = await PlanMembershipModel.dbCreateOnePlanMembership({
        userID: user.id,
        planID,
        role,
        inviteStatus
      })

      if (leaderPlanMembership === null) {
        throw new Error('plan membership model failed')
      }

      return leaderPlanMembership
    } catch (err) {
      console.error(`failed to initiatePlanMembership ${err}`)
      return null
    }
  }

  public static async getPlanMembers(planID: string): Promise<User[]> {
    try {
      const planMembers = await PlanMembershipModel.dbReadPlanMembers({ planID })

      if (planMembers === undefined || planMembers === null) throw new Error('plan membership model failed')

      // map through planMembers and return an array of user object
      const arrayOfUsers = planMembers.map(planMember => planMember.user)

      return arrayOfUsers
    } catch (err) {
      console.error(`failed to getPlanMembers ${err}`)
      throw new Error(err as string)
    }
  }
}
