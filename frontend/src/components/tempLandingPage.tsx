/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from './UserContext'

export const TempLandingPage = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loadingStatus] = useContext(UserContext)
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
      <h1>WeWrap Home {user.firstName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
