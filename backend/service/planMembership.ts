import PlanMembershipModel from "../models/planMembership";

export default class PlanMembership {

  public static async initiatePlanMembership(data: any) {
    const leaderPlanMembership = await PlanMembershipModel.dbCreateOnePlanMembership(data)
    const friendsPlanMembership = await PlanMembershipModel.dbCreateManyPlanMembership(data)
    
    return [leaderPlanMembership, friendsPlanMembership]
  }

}
