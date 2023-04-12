import PlanMembershipModel from '../models/planMembership';

export default class PlanMembership {
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
}
