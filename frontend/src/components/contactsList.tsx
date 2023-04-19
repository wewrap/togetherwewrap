import React, { useEffect, useState } from 'react'
import { CreateAContactForm } from './contactsForm'
import axios from 'axios'

interface Contact {
  id: string
  firstName: string
  lastName?: string
  email?: string
  phoneNumber?: string
  notes?: string
  source?: string
  ownerID: string
  relationships?: UserContactRelationship[]
  importantDateEvent?: ImportantDateEvent[]
}

interface UserContactRelationship {
  id: string
  relationshipType: string
}

interface ImportantDateEvent {
  id: string
  date: string
  eventType: string
}

export const ContactsList = () => {
  const [showCreateAContactForm, setShowCreateAContactForm] = useState<boolean>(false)
  const [contacts, setContacts] = useState<Contact[]>([])

  const toggleContactForm = () => {
    setShowCreateAContactForm(!showCreateAContactForm)
  }

  const handleContactCreate = (newContact: Contact) => {
    setContacts((prevState) => [...prevState, newContact])
  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/contacts', { withCredentials: true })
        const contactsData = response.data.contacts as Contact[]
        setContacts(contactsData)
      } catch (error) {
        console.error(error)
      }
    }
    void getContacts()
  }, [])

  return (
    <div>
      <h1>Contacts List</h1>
      <button onClick={toggleContactForm}>Add Contact</button>
      {showCreateAContactForm && <CreateAContactForm setShowCreateAContactForm={setShowCreateAContactForm} handleContactCreate={handleContactCreate} />}
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <p>{contact.firstName} {contact.lastName}</p>
            <p>{contact.email}</p>
            <p>{contact.phoneNumber}</p>
            {contact.relationships && (
              <ul>
                {contact.relationships.map((relationship) => (
                  <li key={relationship.id}>
                    <p>{relationship.relationshipType}</p>
                  </li>
                ))}
              </ul>
            )}
            {contact.importantDateEvent && (
              <ul>
                {contact.importantDateEvent.map((importantDateEvent) => (
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
