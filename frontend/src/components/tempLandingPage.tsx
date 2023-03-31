/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserContext'

export const TempLandingPage = (): JSX.Element => {
  const [user, setUSer] = useContext(UserContext)
  const navigate = useNavigate()
  console.log('🚀 ~ file: tempLandingPage.tsx:9 ~ TempLandingPage ~ user:', user)

  useEffect(() => {
    void getUserData()
  }, [])

  const handleLogout = async (): Promise<void> => {
    try {
      await axios.post('http://localhost:8000/user/logout')
    } catch (error) {
      console.error(error)
    }
    navigate('/login')
  }

  const getUserData = async (): Promise<void> => {
    try {
      const userDataResponse = await axios.get('http://localhost:8000/user-data', { withCredentials: true })
      setUSer(userDataResponse.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>WeWrap Home {user?.firstName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
