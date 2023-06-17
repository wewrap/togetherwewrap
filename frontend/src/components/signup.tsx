/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { useContext, useState } from 'react'
import axios from 'axios'
import styles from './signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import { LoadStatus } from '../utils/types'

export const SignUp = (): JSX.Element | null => {
  const [user, loadingStatus] = useContext(UserContext)
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValidLength, setIsValidLength] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const specialCharRegex = /[^A-Za-z0-9]/;
  const navigate = useNavigate()

  if (loadingStatus === LoadStatus.NOT_LOADED || loadingStatus === LoadStatus.LOADING) {
    return null
  }

  if (user !== null && loadingStatus === LoadStatus.LOADED) {
    navigate('/')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsValidLength(password.length >= 8);
    setHasNumber(/\D/.test(password));
    setHasSpecialChar(specialCharRegex.test(password));

    if (isValidLength && hasNumber && hasSpecialChar) {
      if (password === confirmPassword) {
        setWarning('');
        await axios.post('api/signup', {
          firstName,
          lastName,
          email,
          password
        })
          .then((res) => {
            setWarning('Successful submission.');
          })
          .catch((err) => {
            if (err.response.status === 409) {
              setWarning('Existing email. Please use a different email.');
            } else { setWarning('Submission Error. Please try again.'); }
          })
      } else {
        setConfirmPassword('');
        setWarning('Your passwords do not match.')
      }
    } else {
      setWarning('Your password does not meet the requirements.')
    }
  }

  return (
        <div className = {styles.container}>
        <img className = {styles.logo} src='./wewrap_green.png' alt='wewrap logo'></img>
        <h3 className = {styles.weWrapTitle}> Sign Up for WeWrap </h3>
        <p className = {styles.createAccount} > Create a free account or <Link to = "/login">log in </Link> </p>
            <form className = {styles.signUpForm} onSubmit = {handleSubmit}>
                <p className = {styles.errorNotification}> {warning} </p>
                <label className = {styles.signUpFieldTitles}> First Name <span>*</span>
                    <input id = {styles.signUpFirstName} className = {styles.signUpFields} type = "text" required value = {firstName} onChange = {(event) => { setFirstName(event.target.value) }}/>
                    </label>
                <label className = {styles.signUpFieldTitles}> Last Name <span>*</span>
                    <input className = {styles.signUpFields} type = "text" required value = {lastName} onChange={(event) => { setLastName(event.target.value) }}/>
                    </label>
                <label className = {styles.signUpFieldTitles}> Email <span>*</span>
                    <input className = {styles.signUpFields} type = "text" required value = {email} onChange={(event) => { setEmail(event.target.value) }}/>
                    </label>
                <label className = {styles.signUpFieldTitles}> Password <span>*</span>
                    <input className = {styles.signUpFields} type = "password" required value = {password} onChange={(event) => { setPassword(event.target.value) }}/>
                    <p className = {styles.passwordWarning}> Password must have a minimum of 8 characters and must contain at least one number and one special character. </p>
                    </label>
                <label className = {styles.signUpFieldTitles}> Confirm Password <span>*</span>
                    <input className = {styles.signUpFields} type = "password" required value = {confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }}/>
                    </label>
                <button className = {styles.signUpButton} type = "submit"> Sign Up </button>
                <p className = {styles.termsLink}> By creating an account, you agree to WeWrap LLC's @ <a href = ""> Terms of Service </a> </p>
            </form>
            <p className = {styles.emailLink}> Need help? Email <a href = " "> help@wewrap.com </a> </p>
        </div>
  )
}
