import { type PlanInvite } from '@prisma/client'
import prisma from '../utils/prismaClient'
import { getNthDateFromToday } from '../utils/date'
const db = prisma

export default class PlanInviteModel {
  public static async dbCreateOnePlanInvite(planID: string, inviteeEmail: string): Promise<PlanInvite | null> {
    try {
      const responseData = await db.planInvite.create({
        data: {
          inviteeEmail,
          planID,
          expiration: getNthDateFromToday(1)
        }
      })

      return responseData
    } catch (error) {
      console.error(`Error in dbCreateOnePlanInvite: ${error}`)
      return null
    }
  }

  public static async updatePlanInviteExpiration(planInviteID: string): Promise<PlanInvite | null> {
    try {
      const responseData = await db.planInvite.update({
        data: {
          expiration: getNthDateFromToday(1)
        },
        where: {
          id: planInviteID
        }
      })
      return responseData
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public static async readOnePlanInvite(planID: string, email: string): Promise<PlanInvite | null> {
    try {
      const responseData = await db.planInvite.findFirst({
        where: {
          planID,
          inviteeEmail: email
        }
      })

      if (responseData === null) throw new Error(`Unable to find a matching plan invite with ${planID} and ${email} in database`)

      return responseData;
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
