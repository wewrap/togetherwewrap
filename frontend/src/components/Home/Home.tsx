import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoadStatus } from '../../utils/types'
import { NavBarLoggedOut } from '../NavBar/NavBar'
import { UserContext } from '../UserContext'

export const Home = (): JSX.Element => {
  const [user, loadingStatus] = useContext(UserContext);

  if (loadingStatus === LoadStatus.LOADING || loadingStatus === LoadStatus.NOT_LOADED) {
    return (<h1>Loading</h1>)
  }

  if (user !== null) {
    return (<Navigate to='/hub' />)
  }
  return (
    <div>
      <NavBarLoggedOut />
      <Outlet />
    </div>
  )
}
