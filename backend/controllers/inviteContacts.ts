import { type NextFunction } from 'express';
import InviteContactService from '../service/inviteContact';

export default class InviteContactController {
  public static async inviteContacts(req: any, res: any, next: NextFunction): Promise<void> {
    try {
      const {
        message,
        selectedContacts: contacts,
        planID
      } = req.body

      const inviteContactsRes = InviteContactService.setupEmailInviteToContacts(req.user, planID, contacts, message)

      if (inviteContactsRes === null) throw new Error('Unable to send invites to all contacts')

      if (inviteContactsRes?.length !== 0) {
        res.status(201).json({
          data: `${inviteContactsRes.length} were already invited, please try again later`,
          contactsNotInvited: inviteContactsRes
        })
      }

      res.status(201).json({
        success: 'Sucessfully sent email to all contacts'
      })
    } catch (error) {
      console.error(error)
      res.status(400).json({
        error: `Invite contacts controller failed: ${error}}`
      })
    }
  }
}
