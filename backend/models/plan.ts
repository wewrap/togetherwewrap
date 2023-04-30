import prisma from '../utils/prismaClient'
import { type Plan } from '@prisma/client'
const db = prisma

export default class PlanModel {
  public static async dbCreateOneplan(incomingData: Plan): Promise<Plan | null> {
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
      return null
    }
  }

  public static async dbReadOnePlan(planID: string): Promise<Plan | null> {
    try {
      const responseData = await db.plan.findUnique({
        where: {
          id: planID
        }
      })

      if (responseData === null) throw new Error(`Plan ${planID} was not found in the database`)

      return responseData
    } catch (err) {
      console.error(`Error in dbReadOnePlan: ${err}`)
      return null
    }
  }
}
