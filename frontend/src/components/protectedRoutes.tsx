import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from './UserContext'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ProtectedRoutes = () => {
  const [user] = useContext(UserContext)
  console.log('🚀 ~ file: protectedRoutes.tsx:8 ~ ProtectedRoutes ~ user:', user)
  return (
    user !== null
      ? <Outlet />
      : <h1>Not authorized</h1>
  )
}
