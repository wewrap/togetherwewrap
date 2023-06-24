import React, { useEffect, useState } from 'react'
import './PlanForm.css'
import axios, { AxiosError } from 'axios'
import { SearchBar } from './PlanHome/SearchBar'
import { type Contact } from '../utils/types'
import { Tag } from './PlanHome/Tag'
enum EventType {
  BIRTHDAY = 'BIRTHDAY',
  ANNIVERSARY = 'ANNIVERSARY',
  GRADUATION = 'GRADUATION',
  WEDDING = 'WEDDING',
  BABY_SHOWER = 'BABY_SHOWER',
  ACHIEVEMENT = 'ACHIEVEMENT',
  HOLIDAY = 'HOLIDAY',
  OTHER = 'OTHER'
}

export interface Friend {
  firstName: string
}

export const fakeUserData = [
  {
    firstName: 'john'
  },
  {
    firstName: 'joe'
  },
  {
    firstName: 'sarah'
  },
  {
    firstName: 'alex'
  },
  {
    firstName: 'kevin'
  },
  {
    firstName: 'bob'
  },
  {
    firstName: 'jenny'
  },
  {
    firstName: 'kim'
  }, {
    firstName: 'josh'
  },
  {
    firstName: 'edward'
  },
  {
    firstName: 'lisett'
  },
  {
    firstName: 'jordan'
  },
  {
    firstName: 'aden'
  }
]

export const PlanForm = ({
  handleModalClose
}: any): JSX.Element => {
  const [specialPerson, setSpecialPerson] = useState<Contact[]>([])
  const [description, setDescription] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [specialDate, setSpecialDate] = useState<string>('')
  const [friends] = useState<Friend[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [eventType, setEventType] = useState<EventType>()
  const [contactsData, setContactsData] = useState<Contact[]>([])

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value)
  }

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStartDate(event.target.value)
  }

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEndDate(event.target.value)
  }

  const handleSpecialDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSpecialDate(event.target.value)
  }

  const handleEventSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setEventType(e.target.value as EventType)
  }

  const handleSpecialPersonSelect = (singleContact: Contact): void => {
    setSpecialPerson([singleContact])
  }

  const handleRemoveTag = (contact: Contact): void => {
    setSpecialPerson([])
  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get('/api/contacts', { withCredentials: true })
        return response
      } catch (error) {
        console.error(error)
      }
    }
    getContacts()
      .then((response: any) => {
        setContactsData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (specialPerson === undefined) {
      handleError('Please add 1 special person')
      return
    }
    // TODO: Implement this route in the backend
    try {
      await axios.post('/api/planForm', {
        specialPerson,
        description,
        startDate,
        endDate,
        specialDate,
        friends,
        eventType
      }, {
        withCredentials: true
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error?.response?.status)
        console.error(error?.response?.data)
        handleError('Failed form submission. Please check your input and retry.')
      }
    }
  }

  const handleError = (message: string): void => {
    if (errorMessage.length > 0) return
    setError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
      setError(false)
    }, 3000)
  }

  const handleFormClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    handleModalClose()
  }

  return (
    <>
      <button onClick={handleFormClose} className='close-form-btn'>
        x
      </button>
      <form onSubmit={handleSubmit} className="form">
        {error && <p className='error-message'> {errorMessage} </p>}

        <div>
          <p>
            Select 1 Special Person from your contact:
          </p>
        </div>
        <SearchBar data={contactsData} handleSelectChangeFn={handleSpecialPersonSelect} alreadySelectedData={specialPerson} />
        {specialPerson?.map((contact: Contact) => {
          return (
            <Tag
              key={contact.id}
              contact={contact}
              handleRemoveTag={handleRemoveTag}
            />
          )
        })}
        <div>
          <label htmlFor='description'>Description: </label>
          <textarea
            id='description'
            required
            value={description}
            className='description-input'
            onChange={handleDescriptionChange}>
          </textarea>
        </div>
        <div>
          <label htmlFor='specialDate'>Special date: </label>
          <input
            type='date'
            id='specialDate'
            value={specialDate}
            required
            onChange={handleSpecialDateChange}
          />
        </div>
        <div>
          <label htmlFor='eventType'>
            Event Type
            <select
              id='eventType'
              value={eventType}
              onChange={handleEventSelect}
            >
              <option />
              {Object.keys(EventType).map(event => {
                return (
                  <option key={event} value={event}>
                    {event}
                  </option>)
              })}

            </select>
          </label>
        </div>
        <div>
          <label htmlFor='startDate'>Start date: </label>
          <input
            type='date'
            id='startDate'
            value={startDate}
            required
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label htmlFor='endDate'>End date: </label>
          <input
            type='date'
            id='endDate'
            value={endDate}
            required
            onChange={handleEndDateChange}
          />
        </div>
        <div>
          <button type='submit'>Create Plan</button>
        </div>
      </form>
    </>
  )
}
