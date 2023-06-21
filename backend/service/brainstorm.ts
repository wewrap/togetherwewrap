import { type User } from '@prisma/client'
import BrainstormModel, { type DbBrainstormCreateInput } from '../models/brainstorm'
import PlanMembershipModel from '../models/planMembership'
import { type BrainstormIdeaPostOutput } from '../utils/types'

interface UpdateBrainstormIdeaPostData {
  id: string
  description: string
  item: string
  itemLink: string
}

export class BrainstormIdeaPostService {
  static async getAllBrainstormIdeaPosts(planID: string) {
    try {
      // get all plan memberships for the plan using planID
      const planMemberships = await PlanMembershipModel.dbReadPlanMembers(planID)

      if (!planMemberships) throw Error('No plan membership found')

      // get all brainstorm idea post for all user membership
      const res: BrainstormIdeaPostOutput[] = [];

      await Promise.all(planMemberships.map(async (planMembership) => {
        const brainstormIdeaPosts = await BrainstormModel.dbReadAllBrainstorm({ planMembershipID: planMembership.id })

        // populate the res array with current plan member's brainstorm idea posts
        brainstormIdeaPosts
          .map((brainstormIdeaPost) => res.push({
            id: brainstormIdeaPost.id,
            firstName: planMembership.user.firstName,
            lastName: planMembership.user.lastName,
            description: brainstormIdeaPost.description,
            item: brainstormIdeaPost.item,
            itemLink: brainstormIdeaPost.itemLink,
            authorId: planMembership.user.id,
            createdAt: brainstormIdeaPost.createdAt,
            updatedAt: brainstormIdeaPost.updatedAt
          }))
      }))

      if (!res) throw Error('No brainstorm data found')
      return res
    } catch (error) {
      throw Error(`Error in BrainstormIdeaPostService.getAllBrainstormIdeaPosts: ${error}`)
    }
  }

  static async createBrainstormIdeaPost(
    planID: string,
    user: User,
    data: { description: string, item: string, itemLink: string }):
    Promise<BrainstormIdeaPostOutput> {
    try {
      // get plan membership using user id
      const planMembership = await PlanMembershipModel.dbReadOnePlanMembership({ planID, userID: user.id })

      if (!planMembership) throw Error('No plan membership found')

      const createBrainstormIdeaPostData: DbBrainstormCreateInput = { ...data, planMembershipID: planMembership.id }

      const res = await BrainstormModel.dbCreateOneBrainstorm(createBrainstormIdeaPostData)

      return { ...res, firstName: user.firstName, lastName: user.lastName, authorId: user.id }
    } catch (error) {
      throw new Error(`Error in BrainstormIdeaPostService.createBrainstormIdeaPost: ${error}`)
    }
  }

  static async updateBrainstormIdeaPost(
    planID: string,
    user: User,
    /*
    id: PlanBrainstorm record ID
    description: description of the idea
    item: the idea itself
    itemLink: link to the idea
    */
    updateBrainstormIdeaPostData: UpdateBrainstormIdeaPostData):
    Promise<BrainstormIdeaPostOutput> {
    try {
      // get plan membership using user id
      const planMembership = await PlanMembershipModel.dbReadOnePlanMembership({ planID, userID: user.id })

      if (!planMembership) throw Error('No plan membership found')

      const res = await BrainstormModel.dbUpdateOneBrainstorm({ id: updateBrainstormIdeaPostData.id }, updateBrainstormIdeaPostData)

      return { ...res, firstName: user.firstName, lastName: user.lastName, authorId: user.id }
    } catch (error) {
      throw new Error(`Error in BrainstormIdeaPostService.updateBrainstormIdeaPost: ${error}`)
    }
  }

  static async deleteBrainstormIdeaPost(brainstormIdeaPostID: string) {
    try {
      const res = await BrainstormModel.dbDeleteOneBrainstorm({ id: brainstormIdeaPostID })

      return res
    } catch (error) {
      throw new Error(`Error in BrainstormIdeaPostService.deleteBrainstormIdeaPost: ${error}`)
    }
  }
}
