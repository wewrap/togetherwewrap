import prisma from '../utils/prismaClient'
import { type Plan } from '@prisma/client'
const db = prisma

export default class PlanModel {
  public static async dbCreateOneplan (incomingData: Plan): Promise<Plan | undefined> {
    try {
      const responseData = await db.plan.create({
        data: {
          description: incomingData.description,
          startDate: incomingData.startDate,
          endDate: incomingData.endDate,
          specialEventType: incomingData.specialEventType
        }
      })

      if (responseData === undefined) throw new Error(`Plan was not created: ${JSON.stringify(incomingData)}`)

      return responseData
    } catch (err) {
      console.error(`Error in dbCreateOnePlan: ${err}`)
    }
  }
}
