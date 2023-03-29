import React, { useState } from 'react'
import { SearchBarFilter } from './SearchBarFilter'
import './PlanForm.css'
import axios, { AxiosError } from 'axios'

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

export const PlanForm = (): JSX.Element => {
  const [specialPerson, setSpecialPerson] = useState<Friend | undefined>()
  const [description, setDescription] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [specialDate, setSpecialDate] = useState<string>('')
  const [friends, setFriends] = useState<Friend[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [maxFriends] = useState<number>(3)
  const [eventType, setEventType] = useState<EventType>()

  const handleSpecialPersonChange = (friend: Friend): void => {
    setSpecialPerson(friend)
  }

  const handleSpecialPersonRemove = (friend: Friend[] | undefined): void => {
    friend !== undefined && setSpecialPerson(friend[0])
  }

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

  const handleFriendsChange = (friend: Friend): void => {
    if (friends.length >= maxFriends) {
      handleError(`Only a max of ${maxFriends} friends are allowed`)
    } else if (!friends.includes(friend)) {
      setFriends(friends => [...friends, friend])
    }
  }

  const hanldeRemoveFriends = (friend: Friend[]): void => {
    setFriends(friend)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (specialPerson === undefined) {
      handleError('Please add 1 special person')
      return
    }
    try {
      await axios.post('http://localhost:8000/planform', {
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
      }
    }
  }

  const handleError = (message: string): void => {
    setError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
      setError(false)
    }, 4000)
  }

  const handleEventSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setEventType(e.target.value as EventType)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        {error && <p className='error-message'> {errorMessage} </p>}
        <div>
          Select 1 Special Person (user or contact):
          <SearchBarFilter
            items={fakeUserData}
            handleSelectChange={handleSpecialPersonChange}
            handleRemoveTag={handleSpecialPersonRemove}
            numbOfSelect={1}
          />
        </div>
        <div>
          <label htmlFor='description'>Description: </label>
          <textarea
            id='description'
            required
            value={description}
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
          Add Friends: <SearchBarFilter
            items={fakeUserData}
            handleSelectChange={handleFriendsChange}
            handleRemoveTag={hanldeRemoveFriends}
            numbOfSelect={maxFriends}
            setSelectError={handleFriendsChange}
          />
        </div>
        <div>
          <button type='submit'>Create Plan</button>
        </div>
      </form>
    </div>
  )
}

const fakeUserData = [
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
