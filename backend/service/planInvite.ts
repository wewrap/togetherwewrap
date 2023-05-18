import { type User, InviteStatus, Role } from '@prisma/client';
import PlanMembershipModel from '../models/planMembership';
import prisma from '../utils/prismaClient';
const db = prisma

export default class PlanInviteService {
  static async setUpInviteePlanMembership(planInviteID: string, user: User): Promise<string> {
    // get plan ID
    const plan = await db.planInvite.findFirst({
      where: {
        id: planInviteID
      },
      select: {
        planID: true
      }
    });

    if (plan === null) throw new Error('fail to fetch planID from planInvite model');

    const planID = plan?.planID;

    // create plan membership

    await db.planMembership.create({
      data: {
        planID,
        inviteStatus: InviteStatus.NOT_APPLICABLE,
        role: Role.FRIEND,
        userID: user.id
      }
    });

    return planID
  }

  static async isUserAlreadyPlanMember(planInviteID: string, userID: string) {
    const plan = await db.planInvite.findFirst({
      where: {
        id: planInviteID
      }
    })

    if (plan === null) throw new Error('unable to find plan')

    const isUserInPlan = await PlanMembershipModel.dbReadOnePlanMembership(plan.planID, userID)

    if (isUserInPlan === null) return false

    return true
  }

  static async isUserEmailMatchPlanInviteEmail(user: User, planInviteID: string): Promise<boolean | null> {
    try {
      const res = await db.planInvite.findFirst({
        where: {
          inviteeEmail: user.email,
          id: planInviteID
        }
      })
      if (res === null) return false

      return true
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
