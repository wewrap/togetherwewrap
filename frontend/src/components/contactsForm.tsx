import React, { useState } from 'react'
import axios from 'axios'
import { type Contact } from './contactsList'
import './contactsForm.css'

type ImportantDate = {
  date: string
  eventType: string
}

type Relationship = {
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

  const addRelationship = () => {
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
  ) => {
    setRelationships((prevRelationships) => {
      const updatedRelationships = [...prevRelationships]
      updatedRelationships.splice(index, 1, { ...updatedRelationships[index], [field]: value })
      return updatedRelationships
    })
  }

  const handleRemoveRelationshipType = (index: number) => {
    setRelationships((prevRelationships) => {
      const updatedRelationships = [...prevRelationships]
      updatedRelationships.splice(index, 1)
      return updatedRelationships
    })
  }

  const addImportantEvent = () => {
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
  ) => {
    setImportantDates((prevDates) => {
      const updatedDates = [...prevDates]
      updatedDates.splice(index, 1, { ...updatedDates[index], [field]: value })
      return updatedDates
    })
  }

  const handleRemoveImportantEvent = (index: number) => {
    setImportantDates((prevDates) => [
      ...prevDates.slice(0, index),
      ...prevDates.slice(index + 1)
    ])
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      // TODO(FK) T144: change url once app deployed
      const response = await axios.post('http://localhost:8000/api/contacts', {
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
        ownerID: response.data.ownerID
      })
    } catch (error) {
      console.error(error)
      setErrorMessage((error as any).response.data ?? 'Unknown error occured.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {(errorMessage.length > 0) && <p className="error_message">{errorMessage}</p>}
      {<p className="show_error">{showError}</p>}

      <div className="userInput">
        <div className="fullName">
          <input
            className="first_name"
            name="first_name"
            type="text"
            placeholder='First name'
            autoComplete="on"
            required
            value={firstName}
            onChange={handleFirstNameChange}
          />

          <input
            className="last_name"
            name="last_name"
            type="text"
            placeholder='Last name'
            autoComplete="on"
            required
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>

        <input
          className="email"
          name="email"
          type="text"
          placeholder='Email'
          autoComplete="on"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <input
          className="phoneNumber"
          name="phone_number"
          type="text"
          placeholder='Phone number'
          autoComplete="on"
          required
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <div className="relationshipSection">
          <div className="relationship">
            <input
              type="text"
              placeholder='Relationship'
              value={relationshipType}
              onChange={(event) => {
                const value = event.target.value
                if (onlyLettersRegex.test(value)) {
                  setRelationshipType(value)
                }
              }}
            />
          </div>
          <button type="button" onClick={addRelationship}>+</button>
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
              <button type= "button" onClick={() => { handleRemoveRelationshipType(index) }}>
                x
              </button>
            </div>
          ))}
        </div>

        <div className="importantEventDate">
          <div className="importantEvent">
            <input
              type="text"
              placeholder='Date'
              value={eventDate}
              onChange={(event) => {
                const value = event.target.value
                setEventDate(value)
              }}
            />

            <input
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

          <button type='button' onClick={addImportantEvent}>+</button>
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
              <button type="button" onClick={() => { handleRemoveImportantEvent(index) }}>
                x
              </button>
            </div>
          ))}
        </div>

        <input
            className="notes"
            name="notes"
            type="text"
            placeholder='Notes'
            autoComplete="on"
            required
            value={notes}
            onChange={handleNotesChange}
          />

      </div>
      <div>
        <button className="addContactButton" type="submit">
          Add contact
        </button>
      </div>
    </form>
  )
}
