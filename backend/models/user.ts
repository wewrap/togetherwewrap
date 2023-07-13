import { type User } from '@prisma/client'
import prisma from '../utils/prismaClient'
const db = prisma

export default class UserModel {
  static async dbReadOneUser(whereParams: Partial<User>): Promise<Partial<User>> {
    try {
      const response = await db.user.findFirst({
        where: whereParams,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          cashappID: true,
          venmoID: true,
          paypalID: true,
          googleID: true,
          facebookID: true,
          createdAt: true,
          updatedAt: true,
          cashappUrl: true,
          venmoUrl: true,
          birthDate: true,
          paypalUrl: true
        }
      })

      if (response === null) throw new Error('User not found')
      return response
    } catch (error) {
      console.error(`Error in dbReadOneUser: ${error}`)
      throw new Error(`Error in dbReadOneUser: ${error}`)
    }
  }

  static async dbUpdateOneUser(whereParams: { id: string }, updateParams: Partial<User>): Promise<Partial<User>> {
    try {
      const response = await db.user.update({
        where: whereParams,
        data: updateParams,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          cashappID: true,
          venmoID: true,
          paypalID: true,
          googleID: true,
          facebookID: true,
          createdAt: true,
          updatedAt: true,
          cashappUrl: true,
          venmoUrl: true,
          birthDate: true,
          paypalUrl: true
        }
      })

      return response
    } catch (error) {
      throw new Error(`Error in dbUpdateOneUser: ${error}`)
    }
  }
}
