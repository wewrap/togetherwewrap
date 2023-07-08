import { type PledgeStatus, type Pledge, type PlanMembership } from '@prisma/client'
import PledgeModel from '../models/pledge'
import PlanMembershipModel from '../models/planMembership'

export default class PledgeService {
  static async createPledge(membershipID: string, status: PledgeStatus, platform: string, pledgeAmount: number, pledgeDate: Date): Promise<Pledge> {
    try {
      const pledgeRecord = await PledgeModel.dbCreateOnePledge({ membershipID, status, pledgeAmount, platform, pledgeDate })

      return pledgeRecord
    } catch (error) {
      throw new Error(`Error in PledgeService.createPledge: ${error}`)
    }
  }

  static async getAllPledgesData(planID: string): Promise<Pledge[]> {
    try {
      // get all plan members
      const planMembers = await PlanMembershipModel.dbReadManyPlanMembership({ planID }, false, {})

      // get all pledges from each plan member
      const pledgeRecords = await Promise.all(planMembers.map(async (planMember: PlanMembership) => {
        const pledges = await PledgeModel.dbReadManyPledge({ membershipID: planMember.id })
        return pledges
      }))

      const flattenedPledgeRecords = pledgeRecords.flat()

      // return an array of pledges
      return flattenedPledgeRecords
    } catch (error) {
      console.error(`Error in PledgeService.getAllPledgesData: ${error}`)
      throw new Error(`Error in PledgeService.getAllPledgesData: ${error}`)
    }
  }
}
