import { Role, type Plan, InviteStatus, type User } from '@prisma/client'
import { type GeneralPlanData } from '../utils/types'
import PlanModel from '../models/plan'
import PlanMembershipModel from '../models/planMembership'

export default class PlanService {
  public static async createPlan(planData: any): Promise<Plan | null> {
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

      const planMembers = await PlanMembershipModel.dbReadPlanMembers({ planID })

      if (planMembers === null || planMembers === undefined) throw new Error('Unable to fetch plan members')

      return PlanService.populatePlanDataObjectHelper(plan, planMembers)
    } catch (err) {
      console.error(`Service failure: failed to fetch plan ${err}`)
      return null
    }
  }

  public static async fetchAllPlansData(user: User) {
    try {
      const dbResponse = await PlanMembershipModel.dbReadManyPlanMembership({ userID: user.id }, true, { plan: true })
      return dbResponse
    } catch (error) {
      throw new Error(`Error in fetchAllPlansData: ${error}`)
    }
  }

  private static populatePlanDataObjectHelper(plan: Plan, planMembers: any): GeneralPlanData {
    const planData: GeneralPlanData = {
      description: plan.description,
      specialDate: plan.endDate,
      specialPerson: undefined,
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
}
