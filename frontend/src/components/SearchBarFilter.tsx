/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Tag } from './Tag'
import './searchbar.css'

export interface Item {
  firstName: string
}

interface Props {
  items: Item[]
  handleSelectChange: (item: Item) => void
  handleRemoveTag?: (item: Item[]) => void
  numbOfSelect?: number
  setSelectError?: (item: Item) => void
}

export const SearchBarFilter: React.FC<Props> = ({
  items,
  handleSelectChange,
  handleRemoveTag,
  numbOfSelect,
  setSelectError
}) => {
  const [query, setQuery] = useState<string>()
  const [item, setItems] = useState<Item[]>([])
  const [select, setSelected] = useState<Item[]>([])

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setQuery(value)

    const filteredItems: Item[] = items.filter(
      obj => obj.firstName.toLowerCase().includes(value)
    )
    console.log(filteredItems)
    setItems(filteredItems)
  }

  const handleSelect = (item: Item): void => {
    if (numbOfSelect &&
      select.length < numbOfSelect &&
      !select.includes(item)) {
      handleSelectChange(item)
      setSelected(select => [...select, item])
    } else if (!numbOfSelect && !select.includes(item)) {
      handleSelectChange(item)
      setSelected(select => [...select, item])
    } else {
      setSelectError?.(item)
    }
  }

  const removeTag = (obj: Item): void => {
    const filteredItems: Item[] = select.filter(item => item.firstName !== obj.firstName)
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
          item.map(obj => (
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
        <Tag handleRemoveTag={removeTag} item={obj} key={obj.firstName} />
      ))}
    </div>
    </div>
  )
}
