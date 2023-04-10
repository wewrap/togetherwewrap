import { type User, InviteStatus, Role, EventType } from '@prisma/client'
import { Request, Response } from 'express'
import planFormRouter from '../routes/planForm'
import prisma from '../utils/prismaClient'
const db = prisma

export default class PlanMembershipModel {

  public static async dbCreateOnePlanMembership(data: any) {
    try {
      const responseData = await db.planMembership.create({
        data: {
          role: Role.PLAN_LEADER,
          inviteStatus: InviteStatus.NOT_APPLICABLE,
          userID: data.userID,
          planID: data.planID
        }
      })
      
      return responseData
    } catch (err) {
      console.log(`Error in db.planMembership.create: ${err}`)
    }
  }

  public static async dbCreateManyPlanMembership(data: any) {
    try {
      const responseData = await db.planMembership.createMany({
        data: data.friends.map((friend: any) => (
          {
            userID: friend.id,
            planID: data.planID,
            inviteStatus: InviteStatus.INVITED,
            role: Role.FRIEND
          }
        ))
      })

      return responseData
    } catch (err) {
      console.log(`Error in db.planMembership.createMany: ${err}`)
    }
  }
}
