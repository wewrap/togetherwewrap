import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import styles from './editProfile.module.css';

export interface birthDate {
  date: string
}

export interface timezone {
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
  const [notification, setNotification] = useState<string>();
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const [toggleEdit, hasToggledEdit] = useState<boolean>(true);

  const handleEditProfile = () => {
    setShowCancel(true);
    hasToggledEdit(false);
  };

  const handleCancel = () => {
    setShowCancel(false);
    hasToggledEdit(true);
  }

  const handleSaveChanges = () => {
    handleEditProfile();
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await axios.post('/api/account', {
      firstName,
      lastName,
      username,
      URL,
      email,
      phoneNumber,
      address,
      birthDate,
      timezone,
      bio
    })
      .then((res) => {
        setNotification('Successful submission.');
        setShowCancel(false);
      })
      .catch((err) => {
        setNotification(`Error occured. Please try again. error: ${err}`)
      })
  }

  return (
        <div className = {styles.container}>
        <form className = {styles.profileForm} onSubmit = {handleSubmit}>
            <div className = {styles.profileContainer}>
                <label className = {styles.profileNotifTitles}> {notification} </label>
            </div>
            <div className = {styles.profileNameContainer}>
                <label className= {styles.profileNameTitles}> first name </label>
                <input id = "profileFirstName" readOnly = {toggleEdit} className = {styles.profileFirstNameField} type = "text" value = {firstName} onChange = {(event) => { setFirstName(event.target.value) }}/>
                <label className = {styles.profileNameTitles}> last name </label>
                    <input id = "profileLastName" readOnly = {toggleEdit} className = {styles.profileLastNameField} type = "text" value = {lastName} onChange = {(event) => { setLastName(event.target.value) }}/>
            </div>
            <div className = {styles.profileContainer}>
                <label className = {styles.profileNameTitles}> username </label>
                    <input id = "profileUsername" readOnly = {toggleEdit} className = {styles.profileUsernameField} type = "text" value = {username} onChange = {(event) => { setUsername(event.target.value) }}/>
            </div>
            <div className = {styles.profileContainer}>
                <label className = {styles.profileFieldTitles}> URL  </label>
                    <input id = "profileURL" readOnly = {toggleEdit} className = {styles.profileFields} type = "text" value = {URL} onChange = {(event) => { setURL(event.target.value) }}/>
            </div>
            <div className = {styles.profileContainer}>
                <label className = {styles.profileFieldTitles}> email </label>
                    <input id = "profileEmail" readOnly = {toggleEdit} className = {styles.profileFields} type = "text" value = {email} onChange = {(event) => { setEmail(event.target.value) }}/>
            </div>
            <div className = {styles.profileContainer}>
            <label className = {styles.profileFieldTitles}> phone # </label>
                <input id = "profileNumber" readOnly = {toggleEdit} className = {styles.profileFields} type = "text" value = {phoneNumber} onChange = {(event) => { setPhoneNumber(event.target.value) }}/>
            </div>
            <div className = {styles.profileContainer}>
            <label className = {styles.profileFieldTitles}> address </label>
                <input id = "profileAddress" readOnly = {toggleEdit} className = {styles.profileFields} type = "text" value = {address} onChange = {(event) => { setAddress(event.target.value) }}/>
            </div>
            <div className = {styles.profileContainer}>
            <label className = {styles.profileFieldTitles}> birth-date </label>
                <input id = "profileBirthDate" readOnly = {toggleEdit} className = {styles.profileFields} type = "text" value = {birthDate} onChange = {(event) => { setBirthDate(event.target.value) }}/>
            </div>
            <div className = {styles.profileContainer}>
            <label className = {styles.profileFieldTitles}> time-zone </label>
                <input id = "profileTimezone" readOnly = {toggleEdit} className = {styles.profileFields} type = "text" value = {timezone} onChange = {(event) => { setTimezone(event.target.value) }}/>
            </div>
            <div className = {styles.profileContainer}>
            <label className = {styles.profileFieldTitles}> bio </label>
                <input id = "profileTimezone" readOnly = {toggleEdit} className = {styles.profileBioField} type = "text" value = {bio} onChange = {(event) => { setBio(event.target.value) }}/>
            </div>
            <div className = "buttonContainer">
                    {!showCancel
                      ? (
                        <button id = {styles.edit} onClick ={handleEditProfile} className = {styles.editButton} type = "submit"> edit profile </button>
                        )
                      : (
                        <div>
                          <button id = {styles.cancel} onClick = {handleCancel} className = {styles.cancelButton} type = "submit"> cancel </button>
                          <button id = {styles.cancel} onClick = {handleSaveChanges} className = {styles.saveButton} type = "submit"> save changes </button>
                        </div>
                        )}
             </div>
        </form>
        </div>
  )
}
