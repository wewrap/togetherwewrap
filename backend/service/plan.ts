/* eslint-disable no-case-declarations */
import { Role, type Plan, InviteStatus, type User, type Contact, type PlanMembership, PlanStage, type PlanBrainstorm } from '@prisma/client'
import { type GeneralPlanData } from '../utils/types'
import PlanModel, { type dbCreatePlanInput } from '../models/plan'
import PlanMembershipModel from '../models/planMembership'
import ContactModel from '../models/contacts'
import UserModel from '../models/user'
import BrainstormModel from '../models/brainstorm'

export default class PlanService {
  public static async createPlan(planData: dbCreatePlanInput): Promise<Plan | null> {
    try {
      const modelResponse = await PlanModel.dbCreateOneplan(planData)

      if (modelResponse === undefined) throw new Error('model response is undefined')

      return modelResponse
    } catch (err) {
      console.error(`Service Failure: failed to initiate plan: ${err}`)
      return null
    }
  }

  public static async fetchPlanData(planID: string): Promise<GeneralPlanData | null> {
    try {
      const plan = await PlanModel.dbReadOnePlan(planID)

      if (plan === null) throw new Error('model response is null')

      const specialPersonContact = await ContactModel.dbReadOneContact(plan.contactID)

      const planMembers = await PlanMembershipModel.dbReadPlanMembers({ planID })

      if (planMembers === null || planMembers === undefined) throw new Error('Unable to fetch plan members')

      return PlanService.populatePlanDataObjectHelper(plan, planMembers, specialPersonContact)
    } catch (err) {
      console.error(`Service failure: failed to fetch plan ${err}`)
      return null
    }
  }

  public static async fetchAllPlansData(user: User) {
    try {
      // includes the plan related to plan membership
      const dbResponse = await PlanMembershipModel.dbReadManyPlanMembership({ userID: user.id }, true, { plan: true })
      // console.log('🚀 ~ file: plan.ts:45 ~ PlanService ~ fetchAllPlansData ~ dbResponse:', dbResponse)

      // user current membership -> get plan -> plan membership -> user

      const currentUserPlanMembershipsWithPlanLeaderUserRecord = await Promise.all(dbResponse.map(async (planMembership) => {
        // get plan -> get all user plan membership -> find leader -> get leader's user data
        const plan = await PlanModel.dbReadOnePlan(planMembership.planID)

        const planLeaderMembership = plan.PlanMembership.reduce((acc: null | PlanMembership, planMembership) => {
          if (planMembership.role === Role.PLAN_LEADER) return planMembership
          return acc
        }, null)

        if (planLeaderMembership === null) throw new Error('Could not find plan leader membership')

        const planLeaderUserRecord = await UserModel.dbReadOneUser({ id: planLeaderMembership.userID })

        return { planMembership, planLeaderUserRecord }
      }))

      return currentUserPlanMembershipsWithPlanLeaderUserRecord
    } catch (error) {
      throw new Error(`Error in fetchAllPlansData: ${error}`)
    }
  }

  private static populatePlanDataObjectHelper(plan: Plan, planMembers: any, specialPersonContact: Contact): GeneralPlanData {
    const planData: GeneralPlanData = {
      ...plan,
      specialPerson: specialPersonContact,
      members: {
        planLeader: undefined,
        acceptedMembers: [],
        pendingMembers: [],
        deniedMembers: []
      }
    }
    for (const member of planMembers) {
      const userWithPlanMembership = member.user
      if (member.role === Role.SPECIAL_PERSON) planData.specialPerson = userWithPlanMembership
      else if (member.role === Role.PLAN_LEADER) planData.members.planLeader = userWithPlanMembership
      else if (member.role === Role.FRIEND) {
        switch (member.inviteStatus) {
          case InviteStatus.DENY:
            planData.members.deniedMembers.push(userWithPlanMembership)
            break;
          case InviteStatus.ACCEPTED:
            planData.members.acceptedMembers.push(userWithPlanMembership)
            break;
          case InviteStatus.INVITED:
            planData.members.pendingMembers.push(userWithPlanMembership)
            break;
          default:
            throw new Error('asd')
        }
      }
    }
    return planData
  }

  static async updatePlanStage(planID: string, planStage: PlanStage) {
    try {
      const nextStage = STAGES_FLOW[planStage]
      let updatedPlan: Plan | undefined;
      switch (planStage) {
        case PlanStage.BRAINSTORM:
          updatedPlan = await PlanModel.dbUpdateOnePlan({ id: planID }, { stage: nextStage })
          break;
        case PlanStage.VOTING:
          // get all plan memberships record
          const allPlanMemberships = await PlanMembershipModel.dbReadPlanMembers({ planID })

          if (allPlanMemberships === null || allPlanMemberships === undefined) throw new Error('Unable to fetch plan members')

          // get all brainstorm posts
          const allBrainstormPosts = await Promise.all(allPlanMemberships.map(async (planMembership) => {
            const brainstormPosts = await BrainstormModel.dbReadAllBrainstorm({ planMembershipID: planMembership.id })
            return brainstormPosts
          }))
          const flattenedAllBrainstormPosts = allBrainstormPosts.flat()

          // get most voted post
          const mostVotedPost = flattenedAllBrainstormPosts.reduce((acc: any, post: PlanBrainstorm & { planMembership: PlanMembership }) => {
            if (post.voteCount === acc.voteCount) return Math.random() > 0.5 ? post : acc
            if (post.voteCount > acc.voteCount) return post
            return acc
          }, { voteCount: -1 }) as PlanBrainstorm & { planMembership: PlanMembership }

          // update plan with the most voted post
          updatedPlan = await PlanModel.dbUpdateOnePlan({ id: planID }, { chosenGiftName: mostVotedPost.item, chosenGiftLink: mostVotedPost.itemLink, stage: nextStage });
      }

      return updatedPlan
    } catch (error) {
      throw new Error(`Error in updatePlanStage: ${error}`)
    }
  }

  static async updatePlan(planID: string, data: any): Promise<any> {
    try {
      const planRecord = await PlanModel.dbUpdateOnePlan({ id: planID }, data)

      return planRecord
    } catch (error) {
      throw new Error(`Error in updatePlan: ${error}`)
    }
  }
}

const STAGES_FLOW: Record<PlanStage, PlanStage> = {
  [PlanStage.BRAINSTORM]: PlanStage.VOTING,
  [PlanStage.VOTING]: PlanStage.POOL,
  [PlanStage.POOL]: PlanStage.PURCHASE,
  [PlanStage.PURCHASE]: PlanStage.DELIVERY,
  [PlanStage.DELIVERY]: PlanStage.COMPLETED,
  [PlanStage.COMPLETED]: PlanStage.COMPLETED
}
