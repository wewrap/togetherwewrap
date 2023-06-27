import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { type Contact } from './contactsList'
import './contactsForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faPhone, faUserGroup, faStickyNote, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import greenCircle from '../assets/greenCircle.png'
import insertPhotoIcon from '../assets/insertPhotoIcon.png'

interface ImportantDate {
  date: string
  eventType: string
}

interface Relationship {
  relationshipType: string
}

interface Props {
  handleContactCreate: (newContact: Contact) => void
}

export const CreateContactForm = ({ handleContactCreate }: Props) => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([])
  const [eventDate, setEventDate] = useState<string>('')
  const [eventType, setEventType] = useState<string>('')
  const [relationshipType, setRelationshipType] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onlyLettersRegex = /^[A-Za-z\s]*$/;

  const handleChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value)
      }
  const handleFirstNameChange = handleChange(setFirstName)
  const handleLastNameChange = handleChange(setLastName)
  const handleEmailChange = handleChange(setEmail)
  const handlePhoneNumberChange = handleChange(setPhoneNumber)
  const handleNotesChange = handleChange(setNotes)

  const addRelationship = (): void => {
    if (relationshipType.trim() === '') {
      setShowError(true)
      return
    }
    setRelationships(relationships.concat([{ relationshipType }]))
  }

  const handleRelationshipChange = (
    index: number,
    field: keyof Relationship,
    value: any
  ): void => {
    setRelationships((prevRelationships) => {
      const updatedRelationships = [...prevRelationships]
      updatedRelationships.splice(index, 1, { ...updatedRelationships[index], [field]: value })
      return updatedRelationships
    })
  }

  const handleRemoveRelationshipType = (index: number): void => {
    setRelationships((prevRelationships) => {
      const updatedRelationships = [...prevRelationships]
      updatedRelationships.splice(index, 1)
      return updatedRelationships
    })
  }

  const addImportantEvent = (): void => {
    if (eventDate.trim() === '' || eventType.trim() === '') {
      setShowError(true)
      return
    }
    setImportantDates(importantDates.concat([{ date: eventDate, eventType }]))
  }

  const handleImportantEventChange = (
    index: number,
    field: keyof ImportantDate,
    value: any
  ): void => {
    setImportantDates((prevDates) => {
      const updatedDates = [...prevDates]
      updatedDates.splice(index, 1, { ...updatedDates[index], [field]: value })
      return updatedDates
    })
  }

  const handleRemoveImportantEvent = (index: number): void => {
    setImportantDates((prevDates) => [
      ...prevDates.slice(0, index),
      ...prevDates.slice(index + 1)
    ])
  }

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }
  }, [isSubmitted]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      // TODO(FK) T144: change url once app deployed
      const response = await axios.post('/api/contacts', {
        firstName,
        lastName,
        relationships,
        importantDates,
        email,
        phoneNumber,
        notes
      }, {
        withCredentials: true
      })
      handleContactCreate({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        relationships: response.data.relationships,
        importantDateEvent: response.data.importantDates,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        notes: response.data.notes,
        id: response.data.id,
        ownerID: response.data.ownerID,
        createdAt: response.data.createdAt
      })
      setFirstName('');
      setLastName('');
      setRelationships([]);
      setImportantDates([]);
      setEventDate('');
      setEventType('');
      setRelationshipType('');
      setEmail('');
      setPhoneNumber('');
      setNotes('');
      setErrorMessage('');
      setShowError(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error)
      setErrorMessage((error as any).response.data ?? 'Unknown error occured.')
    }
  }

  return (
    <form className='contactForm' onSubmit={handleSubmit}>
      {(errorMessage.length > 0) && <p className="error_message">{errorMessage}</p>}
      {<p className="show_error">{showError}</p>}
      <img className='addPhoto' src={insertPhotoIcon} alt="insertPhotoIcon" />
      <img className='greenCircle' src={greenCircle} alt="greenCircle" />
      <hr className="horizontal-line"></hr>
      <div className="userInput scrollable" >
        <div className="contactsNameSection">
          <div className="userIcon">
            <FontAwesomeIcon icon={faUser} className='userIcon' style={{ color: '#c8cbd0' }} />
          </div>
          <div className="fullName">
            <input
              className="first_name contactInput"
              name="first_name"
              type="text"
              placeholder='First name'
              autoComplete="on"
              required
              value={firstName}
              onChange={handleFirstNameChange}
            />

            <input
              className="last_name contactInput "
              name="last_name"
              type="text"
              placeholder='Last name'
              autoComplete="on"
              required
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
        </div>

        <div className="emailSection">
          <div className="emailIcon">
            <FontAwesomeIcon icon={faEnvelope} style={{ color: '#c8cbd0' }} />
          </div>
          <input
          className='contactInput'
          name="email"
          type="text"
          placeholder='Email'
          autoComplete="on"
          required
          value={email}
          onChange={handleEmailChange}
          />
        </div>

        <div className="phoneSection">
          <div className="phoneIcon">
            <FontAwesomeIcon icon={faPhone} style={{ color: '#c8cbd0' }} />
          </div>
          <input
            className='contactInput'
            name="phone_number"
            type="text"
            placeholder='Phone number'
            autoComplete="on"
            required
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>

        <div className="relationshipSection">
          <div className="relationshipIcon">
            <FontAwesomeIcon icon={faUserGroup} style={{ color: '#c8cbd0' }}/>
          </div>
          <div className="relationship">
            <input
              className='contactInput'
              type="text"
              placeholder='Enter relationship'
              value={relationshipType}
              onChange={(event) => {
                const value = event.target.value
                if (onlyLettersRegex.test(value)) {
                  setRelationshipType(value)
                }
              }}
            />
          </div>
          <button type="button" className= 'buttonStyle contactBtn' onClick={addRelationship}>+</button>
        </div>

        <div className="addRelationship">
          {relationships.map((type, index) => (
            <div key={index}>
              <input
                type="text"
                value={type.relationshipType}
                onChange={(event) => { handleRelationshipChange(index, 'relationshipType', event.target.value) }
              }
              />
              <button className='addButton buttonStyle' type= "button" onClick={() => { handleRemoveRelationshipType(index) }}>
                x
              </button>
            </div>
          ))}
        </div>

        <div className="importantEventSection">
          <div className="importantEventIcon">
            <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#c8cbd0' }}/>
          </div>
          <div className="importantEvent">
            <input
              className='contactInput'
              type="text"
              placeholder='Date'
              value={eventDate}
              onChange={(event) => {
                const value = event.target.value
                setEventDate(value)
              }}
            />
            <input
              className='contactInput'
              type="text"
              placeholder='Event'
              value={eventType}
              onChange={(event) => {
                const value = event.target.value
                if (onlyLettersRegex.test(value)) {
                  setEventType(value)
                }
              }}
            />
          </div>
          <button className='buttonStyle' type='button' onClick={addImportantEvent}>+</button>
        </div>

        <div className="addImportantEvent">
          {importantDates.map((date, index) => (
            <div key={index}>
              <input
                type="text"
                value={date.date}
                onChange={(event) => { handleImportantEventChange(index, 'date', event.target.value) }}
              />
              <input
                type="text"
                value={date.eventType}
                onChange={(event) => { handleImportantEventChange(index, 'eventType', event.target.value) }}
              />
              <button type="button" className='buttonStyle' onClick={() => { handleRemoveImportantEvent(index) }}>
                x
              </button>
            </div>
          ))}
        </div>

        <div className="noteSection">
            <div className="noteIcon">
              <FontAwesomeIcon icon={faStickyNote} style={{ color: '#c8cbd0' }} />
            </div>
            <input
            className='contactInput'
            name="notes"
            type="text"
            placeholder='Notes'
            autoComplete="on"
            required
            value={notes}
            onChange={handleNotesChange}
            />
        </div>
          <button className="addContactButton buttonStyle" type="submit">Save</button>
          {isSubmitted && (
            <div className="successMessage">
              Contact added successfully!
            </div>
          )}
      </div>
    </form>
  )
}
