import { type PlanInvite } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

export default class PlanInviteModel {
  private static getNthDateFromToday(numOfDay: number): Date {
    const today = new Date()
    const nthDayFromToday = new Date(today)
    nthDayFromToday.setDate(nthDayFromToday.getDate() + numOfDay)

    return nthDayFromToday
  }

  public static async dbCreateOnePlanInvite(planID: string, email: string): Promise<PlanInvite | null> {
    try {
      const responseData = await db.planInvite.create({
        data: {
          inviteeEmail: email,
          planID,
          expiration: PlanInviteModel.getNthDateFromToday(1)
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
          expiration: PlanInviteModel.getNthDateFromToday(1)
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

      if (responseData === null) return null

      // throw new Error(`Unable to find a matching plan invite with ${planID} and ${email} in database`)

      return responseData;
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
