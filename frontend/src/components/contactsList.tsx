import { useEffect, useState } from 'react'
import { CreateContactForm } from './contactsForm'
import axios from 'axios'
import './Modal.css'

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

export const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [modal, setModal] = useState<boolean>(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleContactCreate = (newContact: Contact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  }

  useEffect(() => {
    const getContacts = async () => {
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

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button
        onClick={toggleModal}
        className="btn-modal">
        Add Contact
      </button>
      {modal && (
        <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <CreateContactForm handleContactCreate={handleContactCreate} />
          <button
          className='close-modal'
          onClick={toggleModal}
          >CLOSE</button>
        </div>
      </div>
      )}

      <div className="searchBar">
        <h2>Contacts</h2>
      </div>

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
    </>
  )
}
