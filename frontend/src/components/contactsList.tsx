import { useEffect, useState } from 'react'
import { CreateContactForm } from './contactsForm'
import axios from 'axios'
export interface Contact {
  id: string
  firstName: string
  lastName?: string
  email?: string
  phoneNumber?: string
  notes?: string
  source?: string
  ownerID: string
  relationships?: ContactRelationship[]
  importantDateEvent?: ImportantDateEvent[]
  createdAt: Date
}

interface ContactRelationship {
  id: string
  relationshipType: string
}

interface ImportantDateEvent {
  id: string
  date: string
  eventType: string
}

export const ContactsList = (): JSX.Element => {
  const [showCreateAContactForm, setShowCreateAContactForm] = useState<boolean>(false)
  const [contacts, setContacts] = useState<Contact[]>([])

  const toggleContactForm = (): void => {
    setShowCreateAContactForm(!showCreateAContactForm)
  }

  const handleContactCreate = (newContact: Contact): void => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  }

  useEffect(() => {
    const getContacts = async (): Promise<void> => {
      try {
        const response = await axios.get('http://localhost:8000/api/contacts', { withCredentials: true })
        const contactsData = response.data as Contact[]
        setContacts(contactsData)
      } catch (error) {
        console.error(error)
      }
    }
    getContacts().catch(console.error)
  }, [])

  return (
    <div>
      <h1>Contacts List</h1>
      <button onClick={toggleContactForm}>Add Contact</button>
      {showCreateAContactForm && <CreateContactForm setShowCreateAContactForm={setShowCreateAContactForm} handleContactCreate={handleContactCreate} />}
      <ul>
        {contacts?.map((contact) => (
          <li key={contact.id}>
            <p>{contact.firstName} {contact.lastName}</p>
            <p>{contact.email}</p>
            <p>{contact.phoneNumber}</p>
            {contact.relationships !== null && (
              <ul>
                {contact.relationships?.map((relationship) => (
                  <li key={relationship.id}>
                    <p>{relationship.relationshipType}</p>
                  </li>
                ))}
              </ul>
            )}
            {(contact.importantDateEvent !== null) && (
              <ul>
                {contact.importantDateEvent?.map((importantDateEvent) => (
                  <li key={importantDateEvent.id}>
                    <p>{importantDateEvent.date}</p>
                    <p>{importantDateEvent.eventType}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
