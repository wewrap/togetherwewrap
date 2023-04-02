/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from './UserContext'

export const TempLandingPage = (): JSX.Element => {
  const user = useContext(UserContext)
  console.log('🚀 ~ file: tempLandingPage.tsx:9 ~ TempLandingPage ~ user:', user)
  const navigate = useNavigate()

  const handleLogout = async (): Promise<void> => {
    try {
      await axios.post('http://localhost:8000/user/logout')
    } catch (error) {
      console.error(error)
    }
    navigate('/login')
  }

  return (
    <div>
      <h1>WeWrap Home {user[0]?.firstName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
