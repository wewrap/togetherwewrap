import { type User, type PlanBrainstorm } from '@prisma/client'
import BrainstormModel from '../models/brainstorm'
import PlanMembershipModel from '../models/planMembership'

export class VoteService {
  static async updateVotePost(planID: string, user: User, selectedVotePost: any): Promise<PlanBrainstorm> {
    try {
      // find user plan membership
      const userPlanMembership = await PlanMembershipModel.dbReadOnePlanMembership({ planID, userID: user.id })

      if (userPlanMembership === null) throw new Error('unable to find user plan membership')

      // update votedForPlanPostID within the plan membership
      const updatedPlanMembership = await PlanMembershipModel.dbUpdateOnePlanMembership({ id: userPlanMembership.id }, { votedForPlanPostID: selectedVotePost.id })
      console.log('🚀 ~ file: vote.ts:9 ~ VoteService ~ updateVotePost ~ updatedPlanMembership:', updatedPlanMembership)

      const voteCount = selectedVotePost.voteCount as number

      // increment the count of the vote post
      const updatedVotePost = await BrainstormModel.dbUpdateOneBrainstorm({ id: selectedVotePost.id }, { voteCount: voteCount + 1 })
      console.log('🚀 ~ file: vote.ts:15 ~ VoteService ~ updateVotePost ~ updatedVotePost:', updatedVotePost)

      return updatedVotePost
    } catch (error) {
      throw Error(`Error in VoteService.updateVotePost: ${error}`)
    }
  }
}
