import React, { useContext, useState } from 'react'
import axios from 'axios'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import googleIcon from '../assets/googleIcon.png'
import facebookIcon from '../assets/facebookIcon.png'
import { UserContext } from './UserContext'
import { LoadStatus } from '../utils/loadingStatus'

export const LoginForm = (): JSX.Element | null => {
  const [user, loadingStatus] = useContext(UserContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const navigate = useNavigate()

  if (loadingStatus === LoadStatus.NOT_LOADED || loadingStatus === LoadStatus.LOADING) {
    return null
  }

  if (user !== null && loadingStatus === LoadStatus.LOADED) {
    navigate('/')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:8000/login/password', {
        email,
        password
      }, {
        withCredentials: true
      })
      window.location.href = '/hub';
    } catch (error) {
      console.error(error)
      setErrorMessage((error as any).response.data ?? 'Unknown error occured.')
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  return (
    <div className='login_form'>
      <img src='./wewrap_green.png' alt='wewrap logo'></img>
      <h1>Log in to your account</h1>
      <p className='subheader'>Don't have an account? <Link to="/signup"> Sign up </Link> </p>
      <form action="/login/password" method="post" onSubmit={handleSubmit}>
        {(errorMessage !== '') && <p className='error_message'>{errorMessage}</p>}
        <div className='user_creds'>
          <label htmlFor="email">Email <span>*</span></label>
          <input className="email" name="email" type="text" autoComplete="on" required value={email} onChange={handleEmailChange} />
        </div>
        <div className='user_creds'>
          <label htmlFor="current_password">Password <span>*</span></label>
          <input className="password" name="password" type="password" autoComplete="on" required value={password} onChange={handlePasswordChange} />
        </div>
        <div className='user_helper'>
          <label className='remember_me_and_checkbox'>
            <input type="checkbox" name="remember_me" className="remember_me" />Remember Me
          </label>
          {/* T81 (FK) Create and add route to forgot password page once that page is built */}
          <p className='forget_password'><a href=''>Forgot password?</a> </p>
        </div>
        <div>
          <button className='login_button' type="submit">Log in</button>
        </div>
        <div className='orOAuth'>
          <p>OR</p>
        </div>
        <a className='googleContainer' href='http://localhost:8000/auth/google'>
          <img src={googleIcon} alt='googleIcon' />
          <p>Log in with Google</p>
        </a>
        <a className='facebookContainer' href='http://localhost:8000/auth/facebook'>
          <img src={facebookIcon} alt='googleIcon' />
          <p>Log in with Facebook</p>
        </a>
      </form>
    </div>
  )
}
