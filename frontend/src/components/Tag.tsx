import React, { useState } from 'react'
import type { Item } from './SearchBarFilter'
import './tag.css'

interface Props {
  item: Item
  handleRemoveTag: (item: Item) => void
}

export const Tag: React.FC<Props> = ({ item, handleRemoveTag }) => {
  const [backgroundColor] = useState<any>(generateRandomLightColor())

  const handleClick = (): void => {
    handleRemoveTag(item)
  }
  const tagColor = {
    backgroundColor
  }

  return (
    <div>
      <div className='tag-wrapper' style={tagColor}>
        <div className='tag-text'>{item.firstName}</div>
        <button className='tag-close-button' onClick={handleClick}> x </button>
      </div>
    </div>
  )
}

// generate light hexademical color string
function generateRandomLightColor (): string {
  // Generate random values for the red, green, and blue components
  const r = Math.floor(Math.random() * 100) + 155
  const g = Math.floor(Math.random() * 100) + 155
  const b = Math.floor(Math.random() * 100) + 155

  // Combine the components into a hexadecimal color string
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}
