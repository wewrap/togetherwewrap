import PlanMembershipModel from '../models/planMembership';

export default class PlanMembership {
  // TODO: add a type for data
  public static async initiatePlanMembership(data: any): Promise<any> {
    try {
      const leaderPlanMembership = await PlanMembershipModel.dbCreateOnePlanMembership(data)
      const friendsPlanMembership = await PlanMembershipModel.dbCreateManyPlanMembership(data)

      if (leaderPlanMembership === undefined || friendsPlanMembership === undefined) {
        throw new Error('plan membership model failed')
      }

      return [leaderPlanMembership, friendsPlanMembership]
    } catch (err) {
      console.error(`failed to initiatePlanMembership ${err}`)
    }
  }

  public static async getPlanMembers(planID: string): Promise<any> {
    try {
      const planMembers = await PlanMembershipModel.dbReadPlanMembers({ planID })
      return planMembers
    } catch (err) {
      console.error(`failed to getPlanMembers ${err}`)
    }
  }
}
