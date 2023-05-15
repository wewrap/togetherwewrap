import { type PlanInvite } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

export default class PlanInviteModel {
  public static async dbCreateOnePlanInvite(planID: string, email: string): Promise<PlanInvite | null> {
    // expiration date is Date now + 1 day. 24h for expiration
    try {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 2)

      const responseData = await db.planInvite.create({
        data: {
          inviteeEmail: email,
          planID,
          expiration: tomorrow
        }
      })

      return responseData
    } catch (error) {
      console.error(`Error in dbCreateOnePlanInvite: ${error}`)
      return null
    }
  }
}
