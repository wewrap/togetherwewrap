import { type User, InviteStatus, Role } from '@prisma/client';
import PlanMembershipModel from '../models/planMembership';
import prisma from '../utils/prismaClient';
import PlanInviteModel, { type PlanInviteModelReadInput } from '../models/planInvite';
const db = prisma

export default class PlanInviteService {
  static async setUpInviteePlanMembership(planInviteID: string, user: User): Promise<string> {
    const inputParams: PlanInviteModelReadInput = {
      id: planInviteID
    }

    const planInviteData = await PlanInviteModel.readOnePlanInvite(inputParams)

    if (planInviteData === null) throw new Error('fail to fetch planID from planInvite model');

    // create plan membership

    await db.planMembership.create({
      data: {
        planID: planInviteData.planID,
        inviteStatus: InviteStatus.ACCEPTED,
        role: Role.FRIEND,
        userID: user.id
      }
    });

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
      const res = await PlanInviteModel.readOnePlanInvite({
        inviteeEmail,
        id: planInviteID
      })
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
