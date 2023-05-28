import { type PlanInvite } from '@prisma/client'
import prisma from '../utils/prismaClient'
import { getNthDateFromToday } from '../utils/date'
const db = prisma

export interface PlanInviteModelReadInput extends Partial<PlanInvite> {
  /**
  This is for the purpose of making all the fields in the PlanInvite model optional
  and also to allow the user to pass in any number of fields to the readOnePlanInvite method
   */
}

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

  public static async readOnePlanInvite(params: PlanInviteModelReadInput, options: 'AND' | 'OR' = 'AND'): Promise<PlanInvite | null> {
    try {
      const responseData = await db.planInvite.findFirst({
        where: {
          [options]: {
            ...params
          }
        }
      })

      if (responseData === null) throw new Error(`Unable to find a matching plan invite with in the database${JSON.stringify(params)}`)

      return responseData;
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
