import React, { createContext } from 'react'
import { fetchFriendsAndContacts } from './fetchFriendsAndContacts'

export const UserContext = createContext<any>(null)

export const FriendsAndUserContext = ({ children }: any): JSX.Element => {
  const user = fetchFriendsAndContacts()

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>

  )
}
