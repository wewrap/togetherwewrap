import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoadStatus } from '../utils/types'
import { NavBarLoggedIn } from './NavBar/NavBar'
import { UserContext } from './UserContext'

export const ProtectedRoutes = (): any => {
  const [user, loadingStatus] = useContext(UserContext)

  // TODO: Fix these loading status by using the enum
  if (user !== undefined && user !== null && loadingStatus === LoadStatus.LOADED) {
    return (
      <div>
        <NavBarLoggedIn />
        <Outlet />
      </div>
    )
  }
  if (loadingStatus === LoadStatus.NOT_LOADED || loadingStatus === LoadStatus.LOADING) {
    return (<h1>Loading user data...</h1>)
  }
  if (loadingStatus === LoadStatus.FAILED) {
    return (<Navigate to="/login" />)
  }

  return (<h1>Not authorized</h1>)
}
