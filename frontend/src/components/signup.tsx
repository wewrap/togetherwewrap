import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react"; 
import axios from 'axios';
import { fchmod } from 'fs';
import '../components/signup.css'

export const SignUp = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [warning, setWarning] = useState<string>(''); 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault(); 

            if(password === confirmPassword) {
                setWarning('');
                await axios.post('http://localhost:8000/signup', {
                    firstName,
                    lastName,
                    email,
                    password, 
                })
        
                .then((res) => {
                    console.log(res.data)
                })
        
                .catch((err) => {
                    setWarning('Please use a different email.');
                })
            }
            
            else{
                setConfirmPassword(''); 
                setWarning('Your password did not match. Please try again.')
            }
    }

    return (

        <section className = "container"> 
        {/* <img className = "weWrapLogo" src = './weWrapGreen.png' alt = 'wewrap logo'> </img> */}
        <header> 
        <h3 className = "weWrapTitle"> Sign Up for WeWrap </h3>
        <p className = "createAccount" > Create a free account or &nbsp;<a href = " ">login </a> </p>
        </header>
            {/* <img src = ""> WeWrap Logo </img> */}
            <form className = "signUpForm" onSubmit = {handleSubmit}> 
                <label htmlFor = "errorNotification"> {warning} </label>
                <label htmlFor = "firstName"> 
                    <p className = "firstNameTitle"> First Name * </p>
                    <input className = "firstName" type = "text" required value = {firstName} onChange = {(event) => setFirstName(event.target.value)}/>
                </label>
                <label htmlFor = "lastName">
                <p className = "lastNameTitle"> Last Name * </p>
                    <input className = "lastName" type = "text" required value = {lastName} onChange={(event) => setLastName(event.target.value)}/> 
                </label>
                <label htmlFor = "email"> 
                    <p className = "emailTitle"> Email * </p>
                    <input className = "email" type = "text" required value = {email} onChange={(event) => setEmail(event.target.value)}/>
                </label>
                <label htmlFor = "password"> 
                    <p className = "passwordTitle"> Password * </p>
                    <input className = "password" type = "text" required value = {password} onChange={(event) => setPassword(event.target.value)}/> 
                    <p className = "passwordWarning"> Password must have a minimum of 8 characters and must contain at least one number and one special character. </p>
                </label>
                <label htmlFor = "confirmPassword">
                    <p className = "confirmPasswordTitle"> Confirm Password * </p>
                    <input className = "confirmPassword" type  = "text" required value = {confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/> 
                </label>
                <button className = "submitButton" type = "submit"> Sign Up </button> 
                <p className = "termsLink"> By creating an account, you agree to WeWrap LLC's @ <a href = ""> Terms of Service </a> </p>
            </form>
            <p className = "emailLink"> Need help? Email <a href = " "> help@wewrap.com </a> </p>
            <footer className = "footerChunk"> - </footer>
        </section>

    ); 
};
