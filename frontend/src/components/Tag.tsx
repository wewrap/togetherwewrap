import React, { useState } from 'react'
import { type Friend } from './PlanForm'
import { generateRandomLightColorHex } from '../utils/colorGenerator'
import './tag.css'

interface Props {
  friend: Friend
  handleRemoveTag: (friend: Friend) => void
}

export const Tag: React.FC<Props> = ({ friend, handleRemoveTag }) => {
  const [backgroundColor] = useState<any>(generateRandomLightColorHex())

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
