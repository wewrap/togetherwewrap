import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './editProfile.module.css';

export interface birthDate {
    date: string
  }

export interface timezone{
    date: string
}

export const EditProfile = (): JSX.Element => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [URL, setURL] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>();
    const [timezone, setTimezone] = useState<string>(); 
    const [bio, setBio] = useState<string>(); 
    const [editProfile, setEditProfile] = useState<boolean>(true);
    const [cancel, setCancel] = useState<boolean>(false);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault; 
    }

    return (
        <div className = {styles.container}> 
        <form className = {styles.profileForm} onSubmit = {handleSubmit}> 
            <label htmlFor = {styles.profileFieldTitles}> first name
                <input id = "profileFirstName" className = {styles.profileFields} type = "text" required value = {firstName} onChange = {(event) => { setFirstName(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> last name
                <input id = "profileLastName" className = {styles.profileFields} type = "text" required value = {lastName} onChange = {(event) => { setLastName(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> username
                <input id = "profileUsername" className = {styles.profileFields} type = "text" required value = {username} onChange = {(event) => { setUsername(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> URL
                <input id = "profileURL" className = {styles.profileFields} type = "text" required value = {URL} onChange = {(event) => { setURL(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> email
                <input id = "profileEmail" className = {styles.profileFields} type = "text" required value = {email} onChange = {(event) => { setEmail(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> phone #
                <input id = "profileNumber" className = {styles.profileFields} type = "text" required value = {phoneNumber} onChange = {(event) => { setPhoneNumber(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> address
                <input id = "profileAddress" className = {styles.profileFields} type = "text" required value = {address} onChange = {(event) => { setAddress(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> birth-date
                <input id = "profileBirthDate" className = {styles.profileFields} type = "text" required value = {birthDate} onChange = {(event) => { setBirthDate(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> time-zone
                <input id = "profileTimezone" className = {styles.profileFields} type = "text" required value = {timezone} onChange = {(event) => { setTimezone(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> bio
                <input id = "profileTimezone" className = {styles.profileFields} type = "text" required value = {bio} onChange = {(event) => { setBio(event.target.value) }}/>
            </label>
            <div className = "buttonContainer">
                <button id = {styles.cancel} className = {styles.cancelButton} type = "submit"> {cancel} cancel </button>
                <button id = {styles.edit} className = {styles.editButton} type = "submit"> {editProfile} edit profile </button>
             </div>
        </form>
        </div>
    )
}