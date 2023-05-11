import React, { createContext } from 'react'
import { fetchUser } from '../hooks/fetchUser'
import { type User } from '../utils/types'

export const UserContext = createContext<Array<string | User | null> | any>(null)

export const GetUserContext = ({ children }: { children: JSX.Element[] | JSX.Element }): JSX.Element => {
  const user = fetchUser()

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>

  )
}
