import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from './UserContext'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ProtectedRoutes = () => {
  const [user, loadingStatus] = useContext(UserContext)
  console.log('🚀 ~ file: protectedRoutes.tsx:8 ~ ProtectedRoutes ~ user:', user, loadingStatus)

  if (user !== undefined && user !== null) {
    return (<Outlet />)
  } else if (loadingStatus === 'unloaded' || loadingStatus === 'loading') {
    return (<h1>Loading user data...</h1>)
  } else if (loadingStatus === 'error') {
    return (<h1>Error fetching user</h1>)
  } else {
    return (<h1>Not authorized</h1>)
  }
}
