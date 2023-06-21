import { InviteStatus, type PlanMembership, Role, type User } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

interface dbPlanMembershipCreateInput extends Partial<PlanMembership> {
  planID: string
  userID: string
  inviteStatus: InviteStatus
  role: Role
}

interface dbPlanMembershipReadInput extends Partial<PlanMembership> {

}

export default class PlanMembershipModel {
  public static async dbCreateOnePlanMembership(params: dbPlanMembershipCreateInput): Promise<PlanMembership | null> {
    try {
      const responseData = await db.planMembership.create({
        data: {
          ...params
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

  public static async dbReadOnePlanMembership(params: dbPlanMembershipReadInput) {
    const responseData = await db.planMembership.findFirst({
      where: {
        ...params
      }
    })

    return responseData
  }

  public static async dbReadPlanMembers(params: dbPlanMembershipReadInput): Promise<Array<PlanMembership & {
    user: User
  }
  > | null | undefined> {
    try {
      const responseData = await db.planMembership.findMany({
        where: {
          ...params
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
