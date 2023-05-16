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

      InviteContactService.setupEmailInviteToContacts(req.user, planID, contacts, message)

      res.status(201)
    } catch (error) {
      console.error(error)
      res.status(400).json({
        error: `unable to send invitations: ${error}}`
      })
    }
  }
}
