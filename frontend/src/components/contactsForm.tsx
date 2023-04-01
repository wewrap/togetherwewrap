/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import axios from 'axios'

type ImportantDate = {
  date: string
  event: string
}

type Relationship = {
  type: string
}

interface Props {
  setShowCreateAContactForm: (value: boolean) => void
  handleContactCreate: (newContact: any) => void
}

export const CreateAContactForm = ({ setShowCreateAContactForm, handleContactCreate }: Props) => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showError, setShowError] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(true)

  const resetForm = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhoneNumber('')
    setNotes('')
    setErrorMessage('')
    setRelationshipType('')
    setEventDate('')
    setEventType('')
    setRelationships([])
    setImportantDates([])
  }

  const handleClose = () => {
    setShowForm(false)
    resetForm()
    setShowCreateAContactForm(false)
  }

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
    setRelationships((prevRelationships) => [
      ...prevRelationships,
      {
        type: relationshipType
      }
    ])
    setRelationshipType('')
  }

  const handleRelationshipChange = (
    index: number,
    field: keyof Relationship,
    value: any
  ) => {
    setRelationships((prevRelationships) =>
      prevRelationships.map((type, i) =>
        i === index ? { ...type, [field]: value } : type
      )
    )
  }

  const handleRemoveRelationshipType = (index: number) => {
    setRelationships((prevRelationships) => [
      ...prevRelationships.slice(0, index),
      ...prevRelationships.slice(index + 1)
    ])
  }

  const addImportantEvent = () => {
    if (eventDate.trim() === '' || eventType.trim() === '') {
      setShowError(true)
      return
    }
    setImportantDates((prevDates) => [
      ...prevDates,
      {
        date: eventDate,
        event: eventType
      }
    ])
    setEventDate('')
    setEventType('')
  }

  const handleImportantEventChange = (
    index: number,
    field: keyof ImportantDate,
    value: any
  ) => {
    setImportantDates((prevDates) =>
      prevDates.map((date, i) =>
        i === index ? { ...date, [field]: value } : date
      )
    )
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
      await axios.post('http://localhost:8000/contacts', {
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
        firstName,
        lastName,
        relationships,
        importantDates,
        email,
        phoneNumber,
        notes
      })
      resetForm()
    } catch (error) {
      console.error(error)
      setErrorMessage((error as any).response.data ?? 'Unknown error occured.')
    }
  }

  return (
    <div className="contacts_form">
      {showForm && (
        <>
          <form onSubmit={handleSubmit}>
            <button type='button' onClick={handleClose}>X</button>
            {(errorMessage.length > 0) && <p className="error_message">{errorMessage}</p>}
            <div className="user_input">
              <label htmlFor="first_name">First name</label>
              <input
                className="first_name"
                name="first_name"
                type="text"
                autoComplete="on"
                required
                value={firstName}
                onChange={handleFirstNameChange}
              ></input>

              <label htmlFor="last_name">Last name</label>
              <input
                className="last_name"
                name="last_name"
                type="text"
                autoComplete="on"
                required
                value={lastName}
                onChange={handleLastNameChange}
              ></input>

              <label htmlFor="email">Email</label>
              <input
                className="email"
                name="email"
                type="text"
                autoComplete="on"
                required
                value={email}
                onChange={handleEmailChange}
              ></input>

              <label htmlFor="phone_number">Phone number</label>
              <input
                className="phone_number"
                name="phone_number"
                type="text"
                autoComplete="on"
                required
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              ></input>

              <label htmlFor="notes">Extra Notes</label>
              <input
                className="notes"
                name="notes"
                type="text"
                autoComplete="on"
                required
                value={notes}
                onChange={handleNotesChange}
              ></input>

              <label>
                Relationship with Person
                <input
                  type="text"
                  value={relationshipType}
                  onChange={(event) => {
                    const value = event.target.value
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      setRelationshipType(value)
                    }
                  }}
                />
              </label>
              <button type="button" onClick={addRelationship}>Add</button>
              {relationships.map((type, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={type.type}
                    onChange={(event) => { handleRelationshipChange(index, 'type', event.target.value) }
                    }
                  />
                  <button type= "button" onClick={() => { handleRemoveRelationshipType(index) }}>
                    x
                  </button>
                </div>
              ))}

              <label>
                Date:
                <input
                  type="text"
                  value={eventDate}
                  onChange={(event) => {
                    const value = event.target.value
                    setEventDate(value)
                  }}
                />
              </label>

              <label>
                Event:
                <input
                  type="text"
                  value={eventType}
                  onChange={(event) => {
                    const value = event.target.value
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      setEventType(value)
                    }
                  }}
                />
              </label>
              <button type='button' onClick={addImportantEvent}>Add</button>
              {importantDates.map((date, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={date.date}
                    onChange={(event) => { handleImportantEventChange(index, 'date', event.target.value) }
                    }
                  />
                  <input
                    type="text"
                    value={date.event}
                    onChange={(event) => { handleImportantEventChange(index, 'event', event.target.value) }
                    }
                  />
                  <button type="button" onClick={() => { handleRemoveImportantEvent(index) }}>
                    x
                  </button>
                </div>
              ))}
            </div>
            <div>
              <button className="add_contact_button" type="submit">
                Add contact
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
