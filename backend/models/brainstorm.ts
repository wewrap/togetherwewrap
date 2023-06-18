import { type PlanBrainstorm } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

interface dbBrainstormReadInput extends Partial<PlanBrainstorm> {
}

export default class BrainstormModel {
  static async dbReadAllBrainstorm(params: dbBrainstormReadInput): Promise<PlanBrainstorm[]> {
    try {
      const res = await db.planBrainstorm.findMany({
        where: {
          ...params
        }
      })
      if (!res) throw Error('No brainstorm data found')
      return res
    } catch (error) {
      throw Error(`Error in db.planBrainstorm.findMany: ${error}`)
    }
  }
}
