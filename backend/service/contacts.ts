import ContactModel from '../models/contacts'

export default class ContactService {
  public static async createContact(data: any): Promise<any> {
    try {
      const modelResponse = await ContactModel.dbCreateOneContact(data)

      if (modelResponse === undefined) throw new Error('model response is undefined')

      return modelResponse
    } catch (err) {
      console.error('create contact service failed', err)
    }
  }

  public static async getContacts(ownerID: string): Promise<any> {
    try {
      const modelResponse = await ContactModel.dbGetAllContacts(ownerID)

      if (modelResponse === undefined) throw new Error('model response is undefined')

      return modelResponse
    } catch (err) {
      console.error('get contacts service failed', err)
    }
  }
}
