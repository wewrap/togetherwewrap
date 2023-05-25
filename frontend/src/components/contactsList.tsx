import React, { useEffect, useState } from 'react'
import { CreateContactForm } from './contactsForm'
import axios from 'axios'
import './contactsFormModal.css'
import './contactsList.css'
import plusSign from '../assets/plusSign.png'
import contactIcon from '../assets/contactIcon.png'
import burgerIcon from '../assets/burger.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faClockRotateLeft, faStar, faCloudArrowDown, faShareFromSquare, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons'
import { Popover } from 'react-tiny-popover'
// import prisma from '../utils/prismaClient'

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
  const [formModal, setFormModal] = useState<boolean>(false)
  const [buttonStates, setButtonStates] = useState<boolean[]>([true, false, false])
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [selectedRadioButtonForFilters, setSelectedRadioButtonForFilters] = useState<string>('')

  const handleContactCreate = (newContact: Contact): void => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  }

  const handleViewClick = (index: number) => {
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

  useEffect(() => {
    const sortContacts = (): void => {
      const sortedContacts = [...contacts]
      if (selectedRadioButtonForFilters === 'Alphabetical A-Z') {
        sortedContacts.sort((a, b) => a.firstName.localeCompare(b.firstName, 'en', { sensitivity: 'base' }))
      } else if (selectedRadioButtonForFilters === 'Alphabetical Z-A') {
        sortedContacts.sort((a, b) => b.firstName.localeCompare(a.firstName, 'en', { sensitivity: 'base' }))
      }
      setContacts(sortedContacts)
    }

    sortContacts()
  }, [selectedRadioButtonForFilters])

  const toggleFormModal = () => {
    setFormModal(!formModal)
  }

  if (formModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

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
            />
            <FontAwesomeIcon className='magIcon' icon={faMagnifyingGlass} />
          </div>
      </div>

      <div className="contactList">
        <div className="leftBar">
          <div className="createContactButton">
            <button
            onClick={toggleFormModal}
            className="btn-modal">
            Create contact
            </button>
            <img className='fourColorPlusSign' src={plusSign} alt="plusSign" />
            {formModal && (
              <div className="modal">
                <div onClick={toggleFormModal} className="overlay"></div>
                  <div className="modal-content">
                    <CreateContactForm handleContactCreate={handleContactCreate} />
                    <button
                    className='close-modal buttonStyle'
                    onClick={toggleFormModal}
                    >X</button>
                  </div>
              </div>
            )}
          </div>
          <div className="views">
            <div className="contactView">
              <button className={`viewButtons ${buttonStates[0] ? 'clicked' : ''}`} onClick={() => { handleViewClick(0) }}>
                <FontAwesomeIcon icon={faUser} className='viewIcons' style={{ color: '#c8cbd0', marginRight: '8px' }} />
                Contact
              </button>
            </div>

            <div className="recentView">
              <button className={`viewButtons ${buttonStates[1] ? 'clicked' : ''}`} onClick={() => { handleViewClick(1) }}>
                <FontAwesomeIcon icon={faClockRotateLeft} className='viewIcons' style={{ color: '#c8cbd0', marginRight: '5px' }} />
                Recent
              </button>
            </div>

            <div className="favoriteView">
              <button className={`viewButtons ${buttonStates[2] ? 'clicked' : ''}`} onClick={() => { handleViewClick(2) }}>
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
              <Popover
                isOpen={isPopoverOpen}
                positions={['bottom']}
                reposition={true}
                onClickOutside={() => { setIsPopoverOpen(false) }}
                content={
                <div className='popOverContent'>
                  <div className='radioButton1'>
                    <input
                      type='radio'
                      name='filterButtons'
                      value='Alphabetical A-Z'
                      checked={selectedRadioButtonForFilters === 'Alphabetical A-Z'}
                      onChange={(e) => { setSelectedRadioButtonForFilters(e.target.value) }}
                    />
                    <span>Alphabetical A-Z</span>
                  </div>
                  <div className='radioButton2'>
                    <input
                      type='radio'
                      name='filterButtons'
                      value='Alphabetical Z-A'
                      checked={selectedRadioButtonForFilters === 'Alphabetical Z-A'}
                      onChange={(e) => { setSelectedRadioButtonForFilters(e.target.value) }}
                    />
                    <span>Alphabetical Z-A</span>
                  </div>
                </div>}
              >
                <button className='navButtons' onClick={() => { setIsPopoverOpen(!isPopoverOpen) }}>
                  <FontAwesomeIcon icon={faArrowUpWideShort} style={{ color: '#8C8787' }} />
                </button>
              </Popover>
            </div>
          </div>
          <hr className="mainHorizontalLine"></hr>
          <div className="listOfContacts">
            {contacts?.map((contact) => (
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
