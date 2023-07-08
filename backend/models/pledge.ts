import { type Pledge } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

type dbCreateOnePledgeInput = Pick<Pledge, 'pledgeAmount' | 'status' | 'pledgeDate' | 'membershipID' | 'platform'>

type dbReadManyPledgeInput = Partial<Pledge>

export default class PledgeModel {
  static async dbCreateOnePledge(createParams: dbCreateOnePledgeInput): Promise<Pledge> {
    try {
      const dbResponse = await db.pledge.create({
        data: createParams,
        include: {
          membership: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      })

      return dbResponse
    } catch (error) {
      console.error(`Error in dbCreateOnePledge: ${error}`)
      throw new Error(`Error in dbCreateOnePledge: ${error}`)
    }
  }

  static async dbReadManyPledge(whereParams: dbReadManyPledgeInput): Promise<Pledge[]> {
    try {
      const response = await db.pledge.findMany({
        where: whereParams,
        include: {
          membership: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      })
      return response
    } catch (error) {
      console.error(`Error in dbReadManyPledge: ${error}`)
      throw new Error(`Error in dbReadManyPledge: ${error}`)
    }
  }
}
