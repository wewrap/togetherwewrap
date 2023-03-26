/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './signup.css'
import { Link } from 'react-router-dom'

export const SignUp = (): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [warning, setWarning] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password === confirmPassword) {
      setWarning('')
      await axios.post('http://localhost:8000/signup', {
        firstName,
        lastName,
        email,
        password
      })

        .then((res) => {
          setWarning('Successful submission.')
        })

        .catch((err) => {
          if (err.response.status === 409) {
            setWarning('Existing email. Please use a different email.')
          } else { setWarning('Submission Error. Please try again.') }
        })
    } else {
      setConfirmPassword('')
      setWarning('Please use a different password.')
    }
  }

  return (
        <div className = "container">
        <img src='./wewrap_green.png' alt='wewrap logo'></img>
        <h3 className = "weWrapTitle"> Sign Up for WeWrap </h3>
        <p className = "createAccount" > Create a free account or&nbsp<Link to = "/login">log in </Link> </p>
            <form className = "signUpForm" onSubmit = {handleSubmit}>
                <p className = "errorNotification"> {warning} </p>
                <label htmlFor = "signUpFieldTitles"> First Name <span>*</span>
                    <input id = "signUpFirstName" className = "signUpFields" type = "text" required value = {firstName} onChange = {(event) => { setFirstName(event.target.value) }}/>
                    </label>
                <label htmlFor = "signUpFieldTitles"> Last Name <span>*</span>
                    <input className = "signUpFields" type = "text" required value = {lastName} onChange={(event) => { setLastName(event.target.value) }}/>
                    </label>
                <label htmlFor = "signUpFieldTitles"> Email <span>*</span>
                    <input className = "signUpFields" type = "text" required value = {email} onChange={(event) => { setEmail(event.target.value) }}/>
                    </label>
                <label htmlFor = "signUpFieldTitles"> Password <span>*</span>
                    <input className = "signUpFields" type = "password" required value = {password} onChange={(event) => { setPassword(event.target.value) }}/>
                    <p className = "passwordWarning"> Password must have a minimum of 8 characters and must contain at least one number and one special character. </p>
                    </label>
                <label htmlFor = "signUpFieldTitles"> Confirm Password <span>*</span>
                    <input className = "signUpFields" type = "password" required value = {confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }}/>
                    </label>
                <button className = "signUpButton" type = "submit"> Sign Up </button>
                <p className = "termsLink"> By creating an account, you agree to WeWrap LLC's @ <a href = ""> Terms of Service </a> </p>
            </form>
            <p className = "emailLink"> Need help? Email <a href = " "> help@wewrap.com </a> </p>
        </div>
  )
}
