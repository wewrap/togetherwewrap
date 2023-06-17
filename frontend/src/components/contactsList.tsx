import { useEffect, useState } from 'react'
import { CreateContactForm } from './contactsForm'
import axios from 'axios'
import './Modal.css'
import './contactsList.css'
import plusSign from '../assets/plusSign.png'
import contactIcon from '../assets/contactIcon.png'
import burgerIcon from '../assets/burger.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faClockRotateLeft, faStar, faCloudArrowDown, faShareFromSquare, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons'

export interface Contact {
  id: string
  firstName: string
  lastName?: string
  email?: string
  phoneNumber?: string
  notes?: string
  source?: string
  ownerID: string
  relationships: ContactRelationship[]
  importantDateEvent?: ImportantDateEvent[]
  isFavorite?: boolean
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

export const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [modal, setModal] = useState<boolean>(false)
  const [buttonStates, setButtonStates] = useState<boolean[]>([true, false, false])
  const [searchQuery, setSearchQuery] = useState('');

  const handleContactCreate = (newContact: Contact): void => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  }

  const handleButtonClick = (index: number) => {
    const updatedButtonStates = buttonStates.map((state: boolean, i: number) => i === index ? !state : false);
    if (buttonStates[index]) {
      return;
    }
    setButtonStates(updatedButtonStates);
  }

  const handleToggleFavorite = (contactID: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        if (contact.id === contactID) {
          const isFavorite = contact.isFavorite ?? false
          return {
            ...contact,
            isFavorite: !isFavorite
          }
        }
        return contact
      })
    )
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

  const toggleModal = () => {
    setModal(!modal)
  }

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ((contact.lastName?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false) ||
    ((contact.email?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false) ||
    ((contact.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false) ||
    contact.relationships.some((relationship) =>
      relationship.relationshipType.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className='background'>
      <div className="contactsHeader">
          <img className='burgerIcon' src={burgerIcon} alt="burgerIcon" />
          <div className='iconAndTitle'>
            <img className='contactIcon' src={contactIcon} alt="contactIcon" />
            <h2>Contacts</h2>
          </div>
          <div className="searchBar">
            <input type="text"
              placeholder="Search"
              className='searchInput'
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); }}
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
                    className='close-modal buttonStyle'
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

            <div className="recentView">
              <button className={`viewButtons ${buttonStates[1] ? 'clicked' : ''}`} onClick={() => { handleButtonClick(1) }}>
                <FontAwesomeIcon icon={faClockRotateLeft} className='viewIcons' style={{ color: '#c8cbd0', marginRight: '5px' }} />
                Recent
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

        <div className="rightBar">
          <div className="rightBarHeader">
            <p className='pName'>Name</p>
            <p className='pEmail'>Email</p>
            <p>Phone number</p>
            <p>Relationship</p>
            <div className="navigationButtons">
              <button className='navButtons'>
                <FontAwesomeIcon icon={faCloudArrowDown} style={{ color: '#8C8787' }} />
              </button>
              <button className='navButtons'>
                <FontAwesomeIcon icon={faShareFromSquare} style={{ color: '#8C8787' }} />
              </button>
              <button className='navButtons'>
                <FontAwesomeIcon icon={faArrowUpWideShort} style={{ color: '#8C8787' }} />
              </button>
            </div>
          </div>
          <hr className="mainHorizontalLine"></hr>

          <div className="listOfContacts">
            {filteredContacts?.map((contact) => (
              <div key={contact.id} className="contactItem">
                <img className="contactIcon" src={contactIcon} alt="contactIcon" />
                  <div className="contactInfo">
                    <div className='dName'> {contact.firstName} {contact.lastName}</div>
                    <div className='dEmail'> {contact.email}</div>
                    <div className='dPhone'> {contact.phoneNumber}</div>
                    {contact.relationships !== null && (
                      <div className="dRelationship">
                        {contact.relationships?.map((relationship) => (
                          <div key={relationship.id}> {relationship.relationshipType}</div>
                        ))}
                      </div>
                    )}
                    <div className="favoriteIcon" onClick={() => { handleToggleFavorite(contact.id); }}>
                      {contact.isFavorite !== null && contact.isFavorite !== undefined && contact.isFavorite
                        ? (
                        <FontAwesomeIcon icon={faStar} style={{ color: '#F9C80E' }} />
                          )
                        : (
                        <FontAwesomeIcon icon={faStar} style={{ color: '#c8cbd0' }} />
                          )}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
