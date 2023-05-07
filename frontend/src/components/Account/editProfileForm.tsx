import * as React from 'react';
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export interface birthDate {
    date: string
  }

export interface timezone{
    date: string
}

export const EditProfile = (): JSX.Element => {
    const [URL, setURL] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>();
    const [timezone, setTimezone] = useState<string>(); 
    const [editProfile, setEditProfile] = useState<string>('edit profile');
    const [cancel, setCancel] = useState<string>('');

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault; 
    }

    return (
        <form className = "profileForm" onSubmit = {handleSubmit}> 
            <label htmlFor = "profileFieldTitles"> 
                <input id = "profileURL" className = "profileFields" type = "text" required value = {URL} onChange = {(event) => { setURL(event.target.value) }}/>
            </label>
            <label htmlFor = "profileFieldTitles"> 
                <input id = "profileFirstName" className = "profileFields" type = "text" required value = {firstName} onChange = {(event) => { setFirstName(event.target.value) }}/>
            </label>
            <label htmlFor = "profileFieldTitles"> 
                <input id = "profileLastName" className = "profileFields" type = "text" required value = {lastName} onChange = {(event) => { setLastName(event.target.value) }}/>
            </label>
            <label htmlFor = "profileFieldTitles"> 
                <input id = "profileEmail" className = "profileFields" type = "text" required value = {email} onChange = {(event) => { setEmail(event.target.value) }}/>
            </label>
            <label htmlFor = "profileFieldTitles"> 
                <input id = "profileBirthDate" className = "profileFields" type = "text" required value = {birthDate} onChange = {(event) => { setBirthDate(event.target.value) }}/>
            </label>
            
              <label htmlFor = "profileFieldTitles"> 
                <input id = "profileTimezone" className = "profileFields" type = "text" required value = {timezone} onChange = {(event) => { setTimezone(event.target.value) }}/>
            </label>
             <div>
                <button className = "profileButton" type = "submit"> {editProfile} </button>
                <button className = "profileButton" type = "submit"> {cancel} </button>
             </div>
        </form>
    )
}