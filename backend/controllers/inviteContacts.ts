import { type NextFunction } from 'express';
import InviteContactService from '../service/inviteContact';

export default class InviteContactController {
  public static async inviteContacts(req: any, res: any, next: NextFunction): Promise<void> {
    try {
      const {
        message,
        selectedContacts: contacts,
        planId
      } = req.body

      await InviteContactService.setupEmailInviteToContacts(req.user, planId, contacts, message)
    } catch (error) {

    }
  }
}
