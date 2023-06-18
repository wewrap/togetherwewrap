import BrainstormModel from '../models/brainstorm'
import PlanMembershipModel from '../models/planMembership'
import { type BrainstormIdeaPost } from '../utils/types'

export class BrainstormIdeaPostService {
  static async getAllBrainstormIdeaPosts(planID: string) {
    try {
      // get all plan memberships for the plan using planID
      const planMemberships = await PlanMembershipModel.dbReadPlanMembers(planID)

      if (!planMemberships) throw Error('No plan membership found')

      // get all brainstorm idea post for all user membership
      const res: BrainstormIdeaPost[] = [];

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
}
