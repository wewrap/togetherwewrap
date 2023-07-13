import { type Pledge, PledgeStatus, type Plan } from '@prisma/client'
import PledgeService from '../service/pledge'
import PlanService from '../service/plan'

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

  static async updatePledge(request: any): Promise<{ updatedPledgeRecord: Pledge, updatedPlanRecord: Plan | null }> {
    try {
      const pledgeData = request.pledgeData
      const confirmationStatus = request.confirmationStatus
      const planData = request.planData
      const validStatuses = Object.values(PledgeStatus);

      if (!validStatuses.includes(confirmationStatus)) {
        throw new Error('Invalid pledge status')
      }
      const status = confirmationStatus as PledgeStatus;
      const updatedPledgeRecord = await PledgeService.updatePledge(pledgeData, { status })

      let updatedPlanRecord = null
      console.log(updatedPledgeRecord.pledgeAmount)
      console.log(planData.currentPledgeAmount)
      if (status === PledgeStatus.CONFIRMED) {
        updatedPlanRecord = await PlanService.updatePlan(planData.id, { currentPledgeAmount: updatedPledgeRecord.pledgeAmount + parseInt(planData.currentPledgeAmount) })
        console.log('🚀 ~ file: pledge.ts:46 ~ PledgeController ~ updatePledge ~ updatedPlanRecord:', updatedPlanRecord)
      }
      return { updatedPledgeRecord, updatedPlanRecord }
    } catch (error) {
      console.error(`Error in PledgeController.updatePledge: ${error}`)
      throw new Error(`Error in PledgeController.updatePledge: ${error}`)
    }
  }
}
