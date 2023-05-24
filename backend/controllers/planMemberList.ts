import PlanMembership from '../service/planMembership'

export default class PlanMemberListController {
  public static async getPlanMemberList(req: any, res: any): Promise<void> {
    try {
      const planMemberList = await PlanMembership.getPlanMembers(req.query.planId)
      res.status(200).json(planMemberList)
    } catch (err) {
      console.error('error in get plan member list', err)
      res.status(400).json({
        error: `unable to get plan member list for planID: ${req.query.planId}}`
      })
    }
  }
}
