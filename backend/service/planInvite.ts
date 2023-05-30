import { type User, InviteStatus, Role } from '@prisma/client';
import PlanMembershipModel from '../models/planMembership';
import PlanInviteModel from '../models/planInvite';

export default class PlanInviteService {
  static async setUpInviteePlanMembership(planInviteID: string, user: User): Promise<string> {
    const planInviteData = await PlanInviteModel.readOnePlanInvite({ id: planInviteID })

    if (planInviteData === null) throw new Error('fail to fetch planID from planInvite model');

    // create plan membership
    await PlanMembershipModel.dbCreateOnePlanMembership({
      planID: planInviteData.planID,
      userID: user.id,
      inviteStatus: InviteStatus.ACCEPTED,
      role: Role.FRIEND
    })

    // return plan id
    return planInviteData.planID
  }

  static async isUserAlreadyPlanMember(planInviteID: string, userID: string) {
    const planInviteData = await PlanInviteModel.readOnePlanInvite({
      id: planInviteID
    })

    if (planInviteData === null) throw new Error('unable to find plan')

    const isUserInPlan = await PlanMembershipModel.dbReadOnePlanMembership(planInviteData.planID, userID)

    if (isUserInPlan === null) return false

    return true
  }

  static async isUserEmailMatchPlanInviteEmail(inviteeEmail: string, planInviteID: string): Promise<boolean | null> {
    try {
      // search the PlanInvite model to see if there is a record of the inviteeEmail and planInviteID
      const res = await PlanInviteModel.readOnePlanInvite({
        inviteeEmail,
        id: planInviteID
      })

      // if no record is found, then email does not match
      if (res === null) return false

      return true
    } catch (error) {
      console.error(error)
      return null
    }
  }

  static async getPlanID(planInviteID: string): Promise<string | null> {
    try {
      const res = await PlanInviteModel.readOnePlanInvite({
        id: planInviteID
      })

      if (res === null) throw new Error('unable to find plan')

      return res.planID
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
