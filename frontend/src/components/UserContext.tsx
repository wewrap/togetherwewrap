import React, { createContext } from 'react'
import { fetchUser } from '../hooks/fetchUser'

export const UserContext = createContext<any>(null)

export const GetUserContext = ({ children }: any): JSX.Element => {
  const user = fetchUser()

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>

  )
}
