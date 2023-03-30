/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import { Tag } from './Tag'
import './searchbar.css'
import { type Friend } from './PlanForm'

interface Props {
  items: Friend[]
  handleSelectChange: (friend: Friend) => void
  handleRemoveTag?: (friend: Friend[]) => void
  numOfSelect: number
  setSelectError?: (friend: Friend) => void
}

export const SearchBarFilter: React.FC<Props> = ({
  items,
  handleSelectChange,
  handleRemoveTag,
  numOfSelect,
  setSelectError
}) => {
  const [query, setQuery] = useState<string>('')
  const [friend, setItems] = useState<Friend[]>([])
  const [select, setSelected] = useState<Friend[]>([])

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setQuery(value)

    const filteredItems: Friend[] = items.filter(
      obj => obj.firstName.toLowerCase().includes(value)
    )
    setItems(filteredItems)
  }

  const handleSelect = (friend: Friend): void => {
    if (select.length < numOfSelect &&
      !select.includes(friend)) {
      handleSelectChange(friend)
      setSelected(select => [...select, friend])
    } else {
      setSelectError?.(friend)
    }
  }

  const removeTag = (obj: Friend): void => {
    const filteredItems: Friend[] = select.filter(friend => friend.firstName !== obj.firstName)
    if (handleRemoveTag) {
      handleRemoveTag(filteredItems)
    }
    setSelected(filteredItems)
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
          friend.map(obj => (
            <div
              className='search-results'
              onClick={() => {
                handleSelect(obj)
              }}
              key={obj.firstName}>{obj.firstName}
            </div>))
        )}
      </div>
      <p>Selected:</p>
      <div className='tag-grid'>
      {select.map(obj => (
        <Tag handleRemoveTag={removeTag} friend={obj} key={obj.firstName} />
      ))}
    </div>
    </div>
  )
}
