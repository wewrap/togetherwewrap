import { NavLink } from 'react-router-dom'
import NavLogo from '../../assets/NavLogo.png'
import NavContact from '../../assets/NavContact.png'
import NavProfile from '../../assets/NavProfile.png'
import styles from './NavBar.module.css'
import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { LoadStatus } from '../../utils/types'
import {
  Link as ChakraLink,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  List,
  ListItem
} from '@chakra-ui/react'
import axios from 'axios'

export const NavBar = (): JSX.Element | null => {
  const [user, loadingStatus] = useContext(UserContext);

  if (loadingStatus === LoadStatus.NOT_LOADED || loadingStatus === LoadStatus.LOADING) {
    return null
  }

  if (user !== null) {
    return <NavBarLoggedIn />
  }
  return <NavBarLoggedOut />
}

export const NavBarLoggedOut = (): JSX.Element => {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <div className={styles.leftSide}>
            <li className={styles.home}>
              <NavLink
                to='/'>
                <img src={NavLogo} alt='nav logo' />
              </NavLink>
            </li>
            {/* <li className={styles.text} >
              <NavLink
                to='/About'
                className='navOnlyTextActive'>
                About
              </NavLink>
            </li> */}
            {/* <li className={styles.text}>
              <NavLink
                to='/support'
                className='navOnlyTextActive'>
                Support
              </NavLink>
            </li> */}
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
      <div className={styles.separator}></div>
    </>
  )
}

export const NavBarLoggedIn = (): JSX.Element => {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <div className={styles.leftSide}>
            <li className={styles.home}>
              <NavLink
                to='/hub'>
                <img src={NavLogo} alt='nav logo' />
              </NavLink>
            </li>
            {/* <li className={styles.text}>
              <NavLink to='/example' className='navOnlyTextActive'>
                example
              </NavLink>
            </li> */}
          </div>
          {/* <li className={styles.calendar}>
            <NavLink to='/calendar'>
              <img src={NavCalendar} />
            </NavLink>
          </li> */}
          <li className={styles.contact}>
            <NavLink to='/contacts'>
              <img src={NavContact} />
            </NavLink>
          </li>
          <li className={styles.profile}>
            <AccountPopover />
          </li>
        </ul>
      </nav>
      <div className={styles.separator}></div>
    </>
  )
}

export default function AccountPopover() {

  const handleLogOut = async () => {
    try {
      await axios.post('/api/logout')
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Box cursor="pointer" >
            <img src={NavProfile} style={{ width: '45px', margin: 'auto' }} />
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            width={200}
            backgroundColor={'var(--chakra-colors-gray-100)'}
          >
            <PopoverBody
              width={'100%'}
            >
              <List spacing={3}>
                <ListItem>
                  <ChakraLink as={NavLink} to='/account' display="block" p={2} textAlign={'center'}>
                    Account
                  </ChakraLink>
                </ListItem>
                <ListItem>
                  <ChakraLink as={NavLink} onClick={handleLogOut} display="block" p={2} textAlign={'center'}>
                    logout
                  </ChakraLink>
                </ListItem>
              </List>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );

}
