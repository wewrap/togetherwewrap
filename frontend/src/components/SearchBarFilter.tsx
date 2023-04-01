/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import { Tag } from './Tag'
import './searchbar.css'
import { type Friend } from './PlanForm'

interface Props {
  friendArray: Friend[]
  handleSelectChange: (friend: Friend) => void
  handleRemoveTag?: (friend: Friend[]) => void
  numOfSelect: number
  setSelectError?: (friend: Friend) => void
}

export const SearchBarFilter: React.FC<Props> = ({
  friendArray,
  handleSelectChange,
  handleRemoveTag,
  numOfSelect,
  setSelectError
}) => {
  const [query, setQuery] = useState<string>('')
  const [friends, setFriends] = useState<Friend[]>([])
  const [selectedFriend, setSelectedFriends] = useState<Friend[]>([])

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setQuery(value)

    const filteredFriends: Friend[] = friendArray.filter(
      friend => friend.firstName.toLowerCase().includes(value)
    )
    setFriends(filteredFriends)
  }

  const handleSelect = (friend: Friend): void => {
    if (selectedFriend.length < numOfSelect &&
      !selectedFriend.includes(friend)) {
      handleSelectChange(friend)
      setSelectedFriends(selectedFriend => [...selectedFriend, friend])
    } else {
      setSelectError?.(friend)
    }
  }

  const removeTag = (obj: Friend): void => {
    const filteredFriends: Friend[] = selectedFriend.filter(friend => friend.firstName !== obj.firstName)
    if (handleRemoveTag) {
      handleRemoveTag(filteredFriends)
    }
    setSelectedFriends(filteredFriends)
  }

  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='search...'
        value={query}
        onChange={handleQuery}
      />
      <div>
        {query && (
          friends.map(friend => (
            <div
              className='search-results'
              onClick={() => {
                handleSelect(friend)
              }}
              key={friend.firstName}>{friend.firstName}
            </div>))
        )}
      </div>
      <p>Selected:</p>
      <div className='tag-grid'>
      {selectedFriend.map(obj => (
        <Tag handleRemoveTag={removeTag} friend={obj} key={obj.firstName} />
      ))}
    </div>
    </div>
  )
}
