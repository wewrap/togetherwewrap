import { type Pledge, PledgeStatus } from '@prisma/client'
import PledgeService from '../service/pledge'

export default class PledgeController {
  static async createPledge(request: any): Promise<Pledge> {
    try {
      const currentUserPlanMembership = request.currentUserPlanMembership
      const { amount, platform } = request

      const pledgeRecord = await PledgeService.createPledge(currentUserPlanMembership.id, PledgeStatus.NOT_CONFIRMED, platform, amount, new Date())
      return pledgeRecord
    } catch (error) {
      console.error(`Error in PledgeController.createPledge: ${error}`)
      throw new Error(`Error in PledgeController.createPledge: ${error}`)
    }
  }

  static async getAllPledgesData(req: any, res: any): Promise<any> {
    try {
      const planID = req.params.planID
      const pledges = await PledgeService.getAllPledgesData(planID)
      res.status(200).json(pledges)
    } catch (error) {
      console.error(`Error in PledgeController.getAllPledgesData: ${error}`)
      throw new Error(`Error in PledgeController.getAllPledgesData: ${error}`)
    }
  }
}
