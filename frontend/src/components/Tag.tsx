import React, { useState } from 'react'
import { type Friend } from './PlanForm'
import './tag.css'

interface Props {
  friend: Friend
  handleRemoveTag: (friend: Friend) => void
}

export const Tag: React.FC<Props> = ({ friend, handleRemoveTag }) => {
  const [backgroundColor] = useState<any>(generateRandomLightColor())

  const handleClick = (): void => {
    handleRemoveTag(friend)
  }
  const tagColor = {
    backgroundColor
  }

  return (
    <div>
      <div className='tag-wrapper' style={tagColor}>
        <div className='tag-text'>{friend.firstName}</div>
        <button className='tag-close-button' onClick={handleClick}> x </button>
      </div>
    </div>
  )
}

// generate light hexademical color string
function generateRandomLightColor (): string {
  const r = Math.floor(Math.random() * 100) + 155
  const g = Math.floor(Math.random() * 100) + 155
  const b = Math.floor(Math.random() * 100) + 155

  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}
