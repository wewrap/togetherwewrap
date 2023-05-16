/* eslint-disable no-case-declarations */
import { type User, type Contact } from '@prisma/client';
import SesService from '../awsSes/SesService';
import PlanInviteModel from '../models/planInvite';

enum PlanInviteStatus {
  HAS_INVITED,
  NOT_INVITED,
  INVITE_EXPIRED
}

export default class InviteContactService {
  static setupEmailInviteToContacts(planLeader: User, planID: string, contactsArray: Contact[], message: string): Contact[] | undefined {
    // TODO: make contact email required in the contacts model
    try {
      const hasInvitedContacts: Contact[] = []
      contactsArray.forEach(async (contact: Contact) => {
        const contactEmail = contact.email as string;

        switch (await InviteContactService.checkPlanInviteStatus(planID, contactEmail)) {
          case PlanInviteStatus.NOT_INVITED:
            const planInviteResponse = await PlanInviteModel.dbCreateOnePlanInvite(planID, contactEmail);

            if (planInviteResponse === null) throw new Error('planInviteResponse is null')

            const url = InviteContactService.generateInviteLink(planInviteResponse.id);

            await InviteContactService.sendEmailInviteToContact(planLeader, url, contactEmail, message)

            break;
          case PlanInviteStatus.INVITE_EXPIRED:
            // resend invite
            const expiredPlanInviteResponse = await PlanInviteModel.readOnePlanInvite(planID, contactEmail);

            if (expiredPlanInviteResponse === null) throw new Error('expiredPlanInviteResponse is null')

            const updatePlanInviteRecord = await PlanInviteModel.updatePlanInviteExpiration(expiredPlanInviteResponse.id)

            if (updatePlanInviteRecord === null) throw new Error('modelResponse is null')

            const newUrl = InviteContactService.generateInviteLink(updatePlanInviteRecord.id);

            await InviteContactService.sendEmailInviteToContact(planLeader, newUrl, contactEmail, message)

            break;
          case PlanInviteStatus.HAS_INVITED:
            hasInvitedContacts.push(contact)
            break;
        }
      })

      return hasInvitedContacts
    } catch (error: any) {
      console.error(error)
      console.error(error.stack)
      return undefined
    }
  }

  private static async checkPlanInviteStatus(planID: string, email: string) {
    if (await PlanInviteModel.readOnePlanInvite(planID, email) === null) {
      return PlanInviteStatus.NOT_INVITED
    }

    if ((await InviteContactService.isPlanInviteExpired(planID, email))) {
      return PlanInviteStatus.INVITE_EXPIRED
    }

    return PlanInviteStatus.HAS_INVITED
  }

  private static async isPlanInviteExpired(planID: string, email: string): Promise<boolean> {
    const today = new Date()

    const planInviteRes = await PlanInviteModel.readOnePlanInvite(planID, email);

    if (planInviteRes === null) throw new Error('Unable to find plan invite')

    return planInviteRes.expiration < today
  }

  private static generateInviteLink(planInviteID: string): string {
    return `/plan-invite/${planInviteID}`
  }

  private static async sendEmailInviteToContact(planLeader: User, url: string, email: string, message: string) {
    try {
      await SesService.sendMail(planLeader, url, email, message);
    } catch (error) {
      console.error(`send email failed: ${error}`)
    }
  }
}
