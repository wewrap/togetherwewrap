import { type PlanBrainstorm } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

export type DbBrainstormInput = Partial<PlanBrainstorm>;

export type DbBrainstormCreateInput = Pick<PlanBrainstorm, 'description' | 'item' | 'itemLink' | 'planMembershipID'>;

export type DbBrainstormUpdateInput = Pick<PlanBrainstorm, 'description' | 'item' | 'itemLink'>;

export default class BrainstormModel {
  static async dbReadAllBrainstorm(params: DbBrainstormInput): Promise<PlanBrainstorm[]> {
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

  static async dbCreateOneBrainstorm(createParams: DbBrainstormCreateInput): Promise<PlanBrainstorm> {
    try {
      const res = await db.planBrainstorm.create({
        data: createParams
      })
      if (!res) throw Error('No brainstorm data found')
      return res
    } catch (error) {
      throw Error(`Error in db.planBrainstorm.update: ${error}`)
    }
  }

  static async dbUpdateOneBrainstorm(whereParams: { id: string }, updateParams: DbBrainstormUpdateInput): Promise<PlanBrainstorm> {
    try {
      const res = await db.planBrainstorm.update({
        where: whereParams,
        data: updateParams
      })
      if (!res) throw Error('No brainstorm data found')
      return res
    } catch (error) {
      throw Error(`Error in db.planBrainstorm.update: ${error}`)
    }
  }

  static async dbDeleteOneBrainstorm(whereParams: { id: string }): Promise<PlanBrainstorm> {
    try {
      const res = await db.planBrainstorm.delete({
        where: whereParams
      })

      if (!res) throw Error('No brainstorm data found')
      return res
    } catch (error) {
      throw Error(`Error in db.planBrainstorm.delete: ${error}`)
    }
  }
}
