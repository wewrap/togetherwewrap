import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { useState} from "react"; 
import axios from 'axios';
import { fchmod } from 'fs';
import './signup.css';
import { Link } from 'react-router-dom';

export const Account = () => {


    const [warning, setWarning] = useState<string>('');
    const [changePassword, setChangePassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault(); 
        await axios.post('http://localhost:8000/account/profile', {
            changePassword
        });
    }

    const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault(); 
        await axios.post('http://localhost:8000/account/profile', {
            changePassword
        });
    }

    return (
        <div className = "container"> 
        <img src='./wewrap_green.png' alt='wewrap logo'></img>
        <h3 className = "weWrapTitle"> View Account </h3>
            <form className = "account" onSubmit = {handleSubmit}> 
                <p className = "errorNotification"> {warning} </p>
                <label htmlFor = "accountFieldTitles"> First Name <span>*</span> 
                    <input id = "accountChangePassword" className = "accountFields" type = "password" required value = {changePassword} onChange = {(event) => setChangePassword(event.target.value)}/>
                    </label>
                <button className = "resetButton" type = "button" onChange = {(event) => {resetPassword}}> Reset Password </button>
                <button className = "refreshButton" type = "button"> Refresh </button> 
            </form>
        </div>
    );
};