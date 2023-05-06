import { NavLink } from 'react-router-dom'
import NavLogo from '../../assets/NavLogo.png'
import NavCalendar from '../../assets/NavCalendar.png'
import NavContact from '../../assets/NavContact.png'
import NavProfile from '../../assets/NavProfile.png'
import styles from './NavBar.module.css'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

export const NavBar = (): JSX.Element | null => {
  const user = useContext(UserContext)[0];

  if (user !== null) {
    return <NavBarLoggedIn />
  }
  return <NavBarLoggedOut />
}

export const NavBarLoggedOut = (): JSX.Element => {
  return (
    <nav className={styles.nav}>
      <ul>
        <div className={styles.leftSide}>
          <li className={styles.home}>
            <NavLink
              to='/tempLandingPage'>
              <img src={NavLogo} alt='nav logo' />
            </NavLink>
          </li>
          <li className={styles.text}>
            <NavLink
              to='/support'>
              Support
            </NavLink>
          </li>
          <li className={styles.text}>
            <NavLink
              to='/About'>
              About
            </NavLink>
          </li>
        </div>
        <li className={styles.login}>
          <NavLink to='/login'>
            <span>
              Login
            </span>
          </NavLink>
        </li>
        <li className={styles.signup}>
          <NavLink to='/signup'>
            <span>
              Sign up
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export const NavBarLoggedIn = (): JSX.Element => {
  return (
    <nav className={styles.nav}>
      <ul>
        <div className={styles.leftSide}>
          <li className={styles.home}>
            <NavLink
              to='/tempLandingPage'>
              <img src={NavLogo} alt='nav logo' />
            </NavLink>
          </li>
          <li className={styles.text}>
            <NavLink to='/hub' className='navOnlyTextActive'>
              Hub
            </NavLink>
          </li>
          <li className={styles.text}>
            <NavLink to='/stuff' className='navOnlyTextActive'>
              stuff
            </NavLink>
          </li>
        </div>
        <li className={styles.calendar}>
          <NavLink to='/calendar'>
            <img src={NavCalendar} />
          </NavLink>
        </li>
        <li className={styles.contact}>
          <NavLink to='/contacts'>
            <img src={NavContact} />
          </NavLink>
        </li>
        <li className={styles.profile}>
          <NavLink to='/profile'>
            <img src={NavProfile} />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
