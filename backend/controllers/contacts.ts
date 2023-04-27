import ContactService from '../service/contacts';
import { type NextFunction } from 'express';

export default class ContactController {
  public static async createContact(req: any, res: any, next: NextFunction): Promise<void> {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        notes,
        source,
        ownerID
      } = req.body;

      const contactData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        notes,
        source,
        ownerID,
        relationships: req.body.relationships,
        importantDateEvent: req.body.importantDateEvent
      };

      const contactRecord = await ContactService.createContact(contactData);

      if (contactRecord === undefined) throw new Error('create contact failed');

      res.status(201).json(contactRecord);
    } catch (err) {
      console.error('error in create contact', err);
      res.status(400).send('error');
    }
  }

  public static async getContacts(req: any, res: any): Promise<void> {
    try {
      const contacts = await ContactService.getContacts();

      res.status(200).json(contacts);
    } catch (err) {
      console.error('error in get contacts', err);
      res.status(400).send('error');
    }
  }
}

export const createContact = ContactController.createContact
export const getContacts = ContactController.getContacts
