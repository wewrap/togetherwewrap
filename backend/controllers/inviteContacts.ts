import { type User } from '@prisma/client';
import { type Response, type NextFunction, type Request } from 'express';
import InviteContactService from '../service/inviteContact';
import PlanInviteService from '../service/planInvite';

export default class InviteContactController {
  public static async inviteContacts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        message,
        selectedContacts: contacts,
        planID
      } = req.body

      const inviteContactsRes = await InviteContactService.sendEmailToNotInvitedAndExpiredInvitedContacts((req.user as User), planID, contacts, message)

      if (inviteContactsRes === null) throw new Error('Unable to send invites to all contacts')

      if (inviteContactsRes.length !== 0) {
        console.log({
          contactsNotInvited: inviteContactsRes
        })
        res.status(200).json({
          data: `${inviteContactsRes.length} were already invited, please try again later`,
          contactsNotInvited: inviteContactsRes
        })
      } else {
        res.status(200).json({
          success: 'Sucessfully sent email to all contacts'
        })
      }
    } catch (error) {
      console.error(error)
      res.status(400).json({
        error: `Invite contacts controller failed: ${error}}`
      })
    }
  }

  static async verifyPlanInvite(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const planInviteID = req.params.id

      // if no cookie, redirect to log in
      if (req.user === null || req.user === undefined) {
        res.status(200).json({
          reason: 'NOT_LOGGED_IN',
          planInviteID
        })
        return
      }

      const isEmailMatch = await PlanInviteService.isUserEmailMatchPlanInviteEmail(req?.user?.email, planInviteID)

      if (isEmailMatch === null) throw new Error('fail to run isUserEmailMatchPlanInviteEmail')

      if (!isEmailMatch) {
        res.status(200).json({
          reason: 'LOGGED_IN_AND_EMAIL_DONT_MATCH'
        })
        return
      }
      // check if user is already a plan member, guard against multiple attempt to 'join' the plan
      const isUserAlreadyPlanMember = await PlanInviteService.isUserAlreadyPlanMember(planInviteID, req.user.id)
      if (isUserAlreadyPlanMember) {
        const planIDResponse = await PlanInviteService.getPlanID(planInviteID)

        if (planIDResponse === null) throw new Error(`Unable to identify planID with the following planInviteID: ${planInviteID}`)

        res.status(200).json({
          reason: 'USER_ALREADY_A_PLAN_MEMBER',
          planID: planIDResponse
        })
        return
      }

      const planID = await PlanInviteService.setUpInviteePlanMembership(planInviteID, req.user)
      console.log('email match')
      res.status(200).json({
        reason: 'LOGGED_IN_AND_EMAIL_MATCH',
        planID
      })
      return
    } catch (error) {
      console.error(error)
    }
  }
}
