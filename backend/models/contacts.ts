import prisma from '../utils/prismaClient'
import { type Contact, type ContactRelationship, type ImportantDateEvent } from '@prisma/client'

const db = prisma

export default class ContactModel {
  public static async dbCreateOneContact(contact: Contact, relationships: ContactRelationship[], importantDateEvents: ImportantDateEvent[]): Promise<Contact | undefined> {
    try {
      const createdContact = await db.contact.create({
        data: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phoneNumber: contact.phoneNumber,
          notes: contact.notes,
          ownerID: contact.ownerID,
          source: contact.source
        }
      })
      await db.contactRelationship.createMany({
        data: relationships.map((relationship: { relationshipType: string }) => ({
          relationshipType: relationship.relationshipType,
          contactID: contact.id
        }))
      })
      await db.importantDateEvent.createMany({
        data: importantDateEvents.map((importantDate: { date: string, eventType: string }) => ({
          date: importantDate.date,
          eventType: importantDate.eventType,
          contactID: contact.id
        }))
      })

      if (createdContact === undefined) throw new Error(`Contact was not created: ${JSON.stringify(contact)}`)

      return createdContact
    } catch (err) {
      console.error(`Error in createOne: ${err}`)
    }
  }

  public static async dbGetAllContacts(ownerID: string): Promise<Contact[] | undefined> {
    try {
      const contacts = await db.contact.findMany({
        where: { ownerID },
        include: {
          relationships: true,
          importantDateEvent: true
        }
      })
      return contacts
    } catch (error) {
      console.error(error)
    }
  }
}
