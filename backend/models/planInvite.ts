import { type PlanInvite } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

export interface PlanInviteModelReadInput extends Partial<PlanInvite> {
  /**
  This is for the purpose of making all the fields in the PlanInvite model optional
  and also to allow the user to pass in any number of fields to the readOnePlanInvite method
   */
}

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

  public static async readOnePlanInvite(params: PlanInviteModelReadInput): Promise<PlanInvite | null> {
    try {
      const responseData = await db.planInvite.findFirst({
        where: {
          ...params
        }
      })

      if (responseData === null) throw new Error(`Unable to find a matching plan invite with in the database${JSON.stringify(params)}`)

      return responseData
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
