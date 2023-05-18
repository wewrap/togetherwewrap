import { type Response, type NextFunction } from 'express';
import PlanInviteService from '../service/planInvite';

export default class PlanInviteController {
  static async verifyPlanInvite(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const planInviteID = req.params.id

      // if no cookie, redirect to log in
      if (req.user === null || req.user === undefined) {
        res.status(200).json({
          status: 'NOT_LOGGED_IN',
          planInviteID
        })
        return
      }

      const isEmailMatch = await PlanInviteService.isUserEmailMatchPlanInviteEmail(req.user, planInviteID)

      if (isEmailMatch === null) throw new Error('fail to run isUserEmailMatchPlanInviteEmail')

      if (isEmailMatch) {
        // check if user is already a plan member, guard against multiple attempt to 'join' the plan
        if (await PlanInviteService.isUserAlreadyPlanMember(planInviteID, req.usuer.id)) {
          res.status(400).json({
            status: 'ALREADY_A_PLAN_MEMBER'
          })
          return
        }

        const planID = await PlanInviteService.setUpInviteePlanMembership(planInviteID, req.user)
        console.log('email match')
        res.status(200).json({
          status: 'LOGGED_IN_AND_EMAIL_MATCH',
          planID
        })
        return
      }

      res.status(200).json({
        status: 'LOGGED_IN_AND_EMAIL_DONT_MATCH'
      })
    } catch (error) {
      console.error(error)
    }
  }
}
