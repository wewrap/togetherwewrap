import prisma from '../utils/prismaClient'
const db = prisma

export default class PlanModel {
  public static async dbCreateOneplan (data: any): Promise<any> {
    try {
      const responseData = await db.plan.create({
        data
      })

      if (responseData === undefined) throw new Error(`Plan was not created: ${data}`)

      return responseData
    } catch (err) {
      console.log(`Error in dbCreateOnePlan: ${err}`)
    }
  }
}
