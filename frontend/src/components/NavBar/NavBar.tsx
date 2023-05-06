import { NavLink } from 'react-router-dom'
import NavLogo from '../../assets/NavLogo.png'
import NavCalendar from '../../assets/NavCalendar.png'
import NavContact from '../../assets/NavContact.png'
import NavProfile from '../../assets/NavProfile.png'
import styles from './NavBar.module.css'

export const NavBar = (): JSX.Element => {
  // const navLinkStyles = ({ isActive }: any): any => {
  //   return {
  //     background: isActive === true ? 'var(--pink)' : 'none',
  //     borderRadius: isActive === true ? '5px' : 'none',
  //     cursor: isActive === true ? 'default' : 'pointer'

  //   }
  // }

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
          <li className={styles.hub}>
            <NavLink to='/hub'>
              Hub
            </NavLink>
          </li>
          <li className={styles.hub}>
            <NavLink to='/stuff'>
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
