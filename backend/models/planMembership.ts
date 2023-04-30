import { InviteStatus, type PlanMembership, Role, type User } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

export default class PlanMembershipModel {
  public static async dbCreateOnePlanMembership(data: any): Promise<PlanMembership | null> {
    try {
      const responseData = await db.planMembership.create({
        data: {
          role: Role.PLAN_LEADER,
          inviteStatus: InviteStatus.NOT_APPLICABLE,
          userID: data.userID,
          planID: data.planID
        }
      })

      return responseData
    } catch (err) {
      console.error(`Error in db.planMembership.create: ${err}`)
      return null
    }
  }

  public static async dbCreateManyPlanMembership(data: any): Promise<any | undefined> {
    try {
      const responseData = await db.planMembership.createMany({
        data: data.friends.map((friend: any) => (
          {
            userID: friend.id,
            planID: data.planID,
            inviteStatus: InviteStatus.INVITED,
            role: Role.FRIEND
          }
        ))
      })
      return responseData
    } catch (err) {
      console.error(`Error in db.planMembership.createMany: ${err}`)
    }
  }

  public static async dbReadPlanMembers(planID: string): Promise<Array<PlanMembership & {
    user: User
  }
  > | null | undefined> {
    try {
      const responseData = await db.planMembership.findMany({
        where: {
          planID
        },
        include: {
          user: true
        }
      })

      return responseData
    } catch (err) {
      console.error(`Error in dbReadPlanMembers: ${err}`)
      return null
    }
  }
}
