import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from './UserContext'

export const ProtectedRoutes = (): any => {
  const [user, loadingStatus] = useContext(UserContext)

  // TODO: Fix these loading status by using the enum
  if (user !== undefined && user !== null) {
    return (<Outlet />)
  }
  if (loadingStatus === 'unloaded' || loadingStatus === 'loading') {
    return (<h1>Loading user data...</h1>)
  }
  if (loadingStatus === 'error') {
    return (<h1>Error fetching user</h1>)
  }

  return (<h1>Not authorized</h1>)
}
