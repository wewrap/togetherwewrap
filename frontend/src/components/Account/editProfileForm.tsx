/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { useContext, useState } from 'react';
import axios from 'axios'
import styles from './editProfile.module.css';
import { UserContext } from '../UserContext';
import { useToast } from '@chakra-ui/react';

export interface birthDate {
  date: string
}

export interface timezone {
  date: string
}

export const EditProfile = (): JSX.Element => {
  const user = useContext(UserContext)[0]
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);

  const [email, setEmail] = useState<string>(user.email);
  const [cashappID, setCashappID] = useState<string>(user.cashappID);
  const [venmoID, setVenmoID] = useState<string>(user.venmoID);
  const [paypalID, setPaypalID] = useState<string>(user.paypalID);

  const [showCancel, setShowCancel] = useState<boolean>(false);
  const [toggleEdit, hasToggledEdit] = useState<boolean>(false);
  const toast = useToast();

  const handleEditProfile = () => {
    setShowCancel(true);
    hasToggledEdit(true);
  };

  const handleCancel = () => {
    setShowCancel(false);
    hasToggledEdit(false);
  }
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/account/${user.id}`, {
        firstName,
        lastName,
        email,
        cashappID,
        venmoID,
        paypalID
      })
      toast({
        title: 'Profile Updated.',
        description: 'Your profile has been updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
        colorScheme: 'green'
      })
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setCashappID(response.data.cashappID);
      setVenmoID(response.data.venmoID);
      setPaypalID(response.data.paypalID);
    } catch (error) {
      console.error(error)
      toast({
        title: 'An error occurred.',
        description: 'Unable to update profile. Please retry again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <h1>Account</h1>

        <div>
          <label className={styles.profileNameTitles}> first name </label>
          {
            user.firstName !== undefined &&
              !toggleEdit
              ? <p>{user.firstName}</p>
              : <input id="profileFirstName" className={styles.profileFirstNameField} type="text" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} />
          }
        </div>
        <div>
          <label className={styles.profileNameTitles}> last name </label>
          {
            user.lastName !== undefined &&
              !toggleEdit
              ? <p>{user.lastName}</p>
              : <input id="profileLastName" className={styles.profileLastNameField} type="text" value={lastName} onChange={(event) => { setLastName(event.target.value) }} />
          }
        </div>
        <div className={styles.profileContainer}>

          <label className={styles.profileFieldTitles}> email </label>
          {
            user.email !== undefined &&
              !toggleEdit
              ? <p>{user.email}</p>
              : <input id="profileEmail" className={styles.profileFields} type="text" value={email} onChange={(event) => { setEmail(event.target.value) }} />
          }
        </div>
        <div className={styles.profileContainer}>

          <label className={styles.profileFieldTitles}> cashappID </label>
          {
            user.cashappID !== undefined &&
              !toggleEdit
              ? <p>{user.cashappID}</p>
              : <input id="profileEmail" className={styles.profileFields} type="text" value={cashappID} onChange={(event) => { setCashappID(event.target.value) }} />
          }
        </div>

        <div className={styles.profileContainer}>

          <label className={styles.profileFieldTitles}> paypalID </label>
          {
            user.paypalID !== undefined &&
              !toggleEdit
              ? <p>{user.paypalID}</p>
              : <input id="profileEmail" className={styles.profileFields} type="text" value={paypalID} onChange={(event) => { setPaypalID(event.target.value) }} />
          }
        </div>
        <div className={styles.profileContainer}>

          <label className={styles.profileFieldTitles}> venmoID </label>
          {
            user.venmoID !== undefined &&
              !toggleEdit
              ? <p>{user.venmoID}</p>
              : <input id="profileEmail" className={styles.profileFields} type="text" value={venmoID} onChange={(event) => { setVenmoID(event.target.value) }} />
          }
        </div>
        <div className={styles.buttonContainer}>
          {!showCancel
            ? (
              <button id={styles.edit} onClick={handleEditProfile} className={styles.editButton} > Edit profile </button>
            )
            : (
              <div>
                <button id={styles.cancel} onClick={handleCancel} className={styles.cancelButton} > Cancel </button>
                <button id={styles.cancel} className={styles.saveButton} type="submit"> Save changes </button>
              </div>
            )}
        </div>
      </form>
    </div>
  )
}
