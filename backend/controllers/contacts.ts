import ContactService from '../service/contacts';
import { type NextFunction } from 'express';

export default class ContactController {
  public static async createContact(req: any, res: any, next: NextFunction): Promise<void> {
    try {
      const contactData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        notes: req.body.notes,
        ownerID: req.user.id,
        relationships: req.body.relationships,
        importantDates: req.body.importantDates
      };

      const contactRecord = await ContactService.createContact(contactData);

      if (contactRecord === undefined) throw new Error('create contact failed');

      res.status(201).send(contactRecord);
    } catch (err) {
      console.error('error in create contact', err);
      res.status(400).send('error');
    }
  }

  public static async getContacts(req: any, res: any): Promise<void> {
    try {
      const contacts = await ContactService.getContacts(req.body.ownerID);

      res.status(200).json(contacts);
    } catch (err) {
      console.error('error in get contacts', err);
      res.status(400).send('error');
    }
  }
}
