import { type User } from '@prisma/client';
import { type Response, type NextFunction, type Request } from 'express';
import InviteContactService from '../service/inviteContact';

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
}
