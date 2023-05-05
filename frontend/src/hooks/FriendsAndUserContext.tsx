import React, { createContext } from 'react'
import { fetchFriends } from './fetchFriends'

export const FriendsContext = createContext<any>(null)

export const GetFriendsContext = ({ children }: any): JSX.Element => {
  const friends = fetchFriends()

  return (
    <FriendsContext.Provider value={friends}>
      {children}
    </FriendsContext.Provider>

  )
}
