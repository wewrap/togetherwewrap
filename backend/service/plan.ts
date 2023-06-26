import { Role, type Plan, InviteStatus, type User, type Contact, type PlanMembership } from '@prisma/client'
import { type GeneralPlanData } from '../utils/types'
import PlanModel, { type dbCreatePlanInput } from '../models/plan'
import PlanMembershipModel from '../models/planMembership'
import ContactModel from '../models/contacts'
import UserModel from '../models/user'

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

      const currentUserPlanMembershipsWithPlanLeaderUserRecord = await Promise.all(dbResponse.map(async (planMembership) => {
        const planLeaderMembership = dbResponse.reduce((acc: null | PlanMembership, planMembership) => {
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
}
