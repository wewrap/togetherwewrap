import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from './UserContext'

export const TempLandingPage = (): JSX.Element => {
  const [user, loadingStatus] = useContext(UserContext)
  const navigate = useNavigate()

  if (user === null || loadingStatus === 'unloaded' || loadingStatus === 'loading') {
    return (
      <h1> loading... </h1>
    )
  }

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
