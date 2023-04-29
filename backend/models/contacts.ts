import prisma from '../utils/prismaClient'
import { type Contact } from '@prisma/client'

const db = prisma

export default class ContactModel {
  public static async dbCreateOneContact(data: any): Promise<Contact | undefined> {
    try {
      const createdContact = await db.contact.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          notes: data.notes,
          ownerID: data.ownerID
        }
      })
      await db.contactRelationship.createMany({
        data: data.relationships.map((relationship: { relationshipType: string }) => ({
          relationshipType: relationship.relationshipType,
          contactID: createdContact.id
        }))
      })

      await db.importantDateEvent.createMany({
        data: data.importantDates.map((importantDate: { date: string, eventType: string }) => ({
          date: importantDate.date,
          eventType: importantDate.eventType,
          contactID: createdContact.id
        }))
      })

      if (createdContact === undefined) throw new Error(`Contact was not created: ${JSON.stringify(data)}`)

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
