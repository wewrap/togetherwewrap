import { type Contact } from '@prisma/client';
import PlanInviteModel from '../models/planInvite';

export default class InviteContactService {
  public static async setupEmailInviteToContacts(planId: string, contactsArray: Contact[], message: string) {
    // TODO: make contact email required
    try {
      contactsArray.forEach(async (contact: Contact) => {
        const planInviteResponse = await PlanInviteModel.dbCreateOnePlanInvite(planId, contact.email as string);

        if (planInviteResponse === null) throw new Error('planInviteResponse is null')

        const url = InviteContactService.generateInviteLink(planInviteResponse.id);

        await InviteContactService.sendEmailInviteToContact(url, contact.email as string, message)
      })
    } catch (error: any) {
      console.error(error)
      console.error(error.stack)
    }
  }

  private static generateInviteLink(planInviteID: string): string {
    return `/plan-invite/${planInviteID}`
  }

  private static async sendEmailInviteToContact(url: string, email: string, message: string) {

  }
}
