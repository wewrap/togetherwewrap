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

      // FIX: this status message is incorrect. It should be 200 if all contacts were invited, 400 if not all contacts were invited.
      // Another fix would be to have the UI display only invitable contacts, and not display contacts that are already invited.
      if (inviteContactsRes.length !== 0) {
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
        res.status(401).json({
          reason: 'NOT_LOGGED_IN',
          planInviteID
        })
        return
      }

      const isEmailMatch = await PlanInviteService.isUserEmailMatchPlanInviteEmail(req?.user?.email, planInviteID)

      if (!isEmailMatch) {
        res.status(200).json({
          reason: 'LOGGED_IN_AND_EMAIL_DONT_MATCH'
        })
        return
      }
      // check if user is already a plan member, guard against multiple attempt to 'join' the plan
      const isUserAlreadyPlanMember = await PlanInviteService.isUserAlreadyPlanMember(planInviteID, req.user.id)
      if (isUserAlreadyPlanMember) {
        const planID = await PlanInviteService.getPlanID(planInviteID)

        if (planID === null) throw new Error(`Unable to identify planID with the following planInviteID: ${planInviteID}`)

        res.status(200).json({
          reason: 'USER_ALREADY_A_PLAN_MEMBER',
          planID
        })
        return
      }

      // cookie is present, email match, set up plan membership
      const planID = await PlanInviteService.setUpInviteePlanMembership(planInviteID, req.user)
      res.status(200).json({
        reason: 'LOGGED_IN_AND_EMAIL_MATCH',
        planID
      })
      return
    } catch (error) {
      console.error(error)
      res.status(400).json({
        error: `Verify plan invite controller failed: ${error}}`
      })
    }
  }
}
