import { useEffect, useState } from 'react'
import { CreateContactForm } from './contactsForm'
import axios from 'axios'
import './Modal.css'
import './contactsList.css'
import plusSign from '../assets/plusSign.png'
import contactIcon from '../assets/contactIcon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons'

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
  const [buttonStates, setButtonStates] = useState<boolean[]>([false, false, false])

  const handleButtonClick = (index: number) => {
    const updatedButtonStates = buttonStates.map((state: boolean, i: number) => i === index ? !state : false);
    if (buttonStates[index]) {
      return;
    }
    setButtonStates(updatedButtonStates);
  }

  const toggleModal = () => {
    setModal(!modal)
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

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <div className='background'>
      <div className="header">
          <div className='iconAndTitle'>
            <img className='contactIcon' src={contactIcon} alt="contactIcon" />
            <h2>Contacts</h2>
          </div>
          <div className="searchBar">
            <input type="text"
              placeholder="Search"
              className='searchInput'
            />
            <FontAwesomeIcon className='magIcon' icon={faMagnifyingGlass} />
          </div>
      </div>

      <div className="contactList">
        <div className="leftBar">
          <div className="createContactButton">
            <button
            onClick={toggleModal}
            className="btn-modal">
            Create contact
            </button>
            <img className='fourColorPlusSign' src={plusSign} alt="plusSign" />
            {modal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal-content">
                    <CreateContactForm handleContactCreate={handleContactCreate} />
                    <button
                    className='close-modal'
                    onClick={toggleModal}
                    >X</button>
                  </div>
              </div>
            )}
          </div>

          <div className="views">
            <div className="contactView">
              <button className={`viewButtons ${buttonStates[0] ? 'clicked' : ''}`} onClick={() => { handleButtonClick(0) }}>
                <FontAwesomeIcon icon={faUser} className='viewIcons' style={{ color: '#c8cbd0', marginRight: '8px' }} />
                Contact
              </button>
            </div>

            <div className="frequentView">
              <button className={`viewButtons ${buttonStates[1] ? 'clicked' : ''}`} onClick={() => { handleButtonClick(1) }}>
                <FontAwesomeIcon icon={faClockRotateLeft} className='viewIcons' style={{ color: '#c8cbd0', marginRight: '5px' }} />
                Frequent
              </button>
            </div>

            <div className="favoriteView">
              <button className={`viewButtons ${buttonStates[2] ? 'clicked' : ''}`} onClick={() => { handleButtonClick(2) }}>
                <FontAwesomeIcon icon={faStar} className='viewIcons' style={{ color: '#c8cbd0', marginRight: '4px' }} />
                Favorite
              </button>
            </div>

          </div>
        </div>
      </div>

      <ul>
        {contacts?.map((contact) => (
          <li key={contact.id}>
            <img className='contactIcon' src={contactIcon} alt="contactIcon" />              <p>{contact.firstName} {contact.lastName}</p>
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
