import prisma from '../utils/prismaClient'
import { type PlanMembership, type Plan } from '@prisma/client'
const db = prisma

export type dbReadPlanInput = Partial<Plan>

export type dbCreatePlanInput = Pick<Plan, 'description' | 'title' | 'startDate' | 'endDate' | 'specialEventType' | 'contactID'>

export default class PlanModel {
  public static async dbCreateOneplan(incomingData: dbCreatePlanInput): Promise<Plan> {
    try {
      const responseData = await db.plan.create({
        data: incomingData
      })

      if (responseData === undefined) throw new Error(`Plan was not created: ${JSON.stringify(incomingData)}`)

      return responseData
    } catch (err) {
      console.error(`Error in dbCreateOnePlan: ${err}`)
      throw new Error(`Error in dbCreateOnePlan: ${err}`)
    }
  }

  public static async dbReadOnePlan(planID: string): Promise<Plan & {
    PlanMembership: PlanMembership[]
  }> {
    try {
      const responseData = await db.plan.findUnique({
        where: {
          id: planID
        },
        include: {
          PlanMembership: true
        }
      })

      if (responseData === null) throw new Error(`Plan ${planID} was not found in the database`)

      return responseData
    } catch (err) {
      console.error(`Error in dbReadOnePlan: ${err}`)
      throw new Error(`Error in dbReadOnePlan: ${err}`)
    }
  }

  public static async dbReadManyPlan(wherePams: dbReadPlanInput): Promise<Plan[]> {
    try {
      const response = await db.plan.findMany({
        where: wherePams
      })

      return response
    } catch (error) {
      throw new Error(`Error in dbReadAllPlan: ${error}`)
    }
  }

  static async dbUpdateOnePlan(wherePams: { id: string }, updateParams: Partial<Plan>): Promise<Plan> {
    try {
      const response = await db.plan.update({
        where: wherePams,
        data: updateParams
      })
      return response
    } catch (error) {
      console.error(`Error in dbUpdateOnePlan: ${error}`)
      throw new Error(`Error in dbUpdateOnePlan: ${error}`)
    }
  }
}
