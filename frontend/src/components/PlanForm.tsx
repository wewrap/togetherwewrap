/* eslint-disable @typescript-eslint/no-misused-promises */
// eslint-disable-next-line @typescript-eslint/key-spacing
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { SearchBarFilter } from './SearchBarFilter'
import type { Item } from './SearchBarFilter'
import './PlanForm.css'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const PlanForm = () => {
  const [specialPerson, setSpecialPerson] = useState<Item | undefined>()
  const [description, setDescription] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [specialDate, setSpecialDate] = useState<string>('')
  const [friends, setFriends] = useState<Item[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [maxFriends] = useState<number>(3)

  const handleSpecialPersonChange = (item: Item): void => {
    setSpecialPerson(item)
  }

  const handleSpecialPersonRemove = (item: Item[] | undefined): void => {
    item !== undefined && setSpecialPerson(item[0])
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

  const handleFriendsChange = (item: Item): void => {
    if (friends.length >= maxFriends) {
      handleError(`Only a max of ${maxFriends} friends are allowed`)
    } else if (!friends.includes(item)) {
      setFriends(friends => [...friends, item])
    }
  }

  const hanldeRemoveFriends = (item: Item[]): void => {
    setFriends(item)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (specialPerson === undefined) {
      handleError('Please add 1 special person')
      return
    }
    try {
      await axios.post('https://localhost:8000/plan-form', {
        specialPerson,
        description,
        startDate,
        endDate,
        specialDate,
        friends
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

  const displayError = (): JSX.Element => (
    (
      <p className='error-message'>{errorMessage}</p>
    )
  )

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        {error && displayError()}
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
