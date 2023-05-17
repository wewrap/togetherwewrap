import { InviteStatus, Role, type User } from '@prisma/client';
import { type NextFunction } from 'express';
import prisma from '../utils/prismaClient';
const db = prisma

export default class PlanInviteController {
  static async verifyPlanInvite(req: any, res: any, next: NextFunction): Promise<void> {
    try {
      const planInviteID = req.params.id
      console.log(req.params.id)
      // if cookie, check for user id matches invitee email

      if (req.user !== null || req.user !== undefined) {
        const isEmailMatch = await this.isUserEmailMatchPlanInviteEmail(req.user, planInviteID)

        if (isEmailMatch === null) throw new Error('fail to run isUserEmailMatchPlanInviteEmail')

        if (isEmailMatch) {
          const planID = await this.setUpPlanMembership(planInviteID, req.user)
          res.redirect(`http://localhost:3000/plan/${planID}`)
        }
      }

      res.redirect(`http://localhost:3000/login/${planInviteID}`)
      // if no cookie, redirect to login/:id
    } catch (error) {
      console.error(error)
    }
  }

  static async setUpPlanMembership(planInviteID: string, user: User): Promise<string> {
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
