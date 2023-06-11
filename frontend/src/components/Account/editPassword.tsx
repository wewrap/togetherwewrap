import * as React from 'react';
import { useState } from 'react'
import styles from './editPassword.module.css';
import axios from 'axios'

export const EditPassword = (): JSX.Element => {
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const [toggleEdit, hasToggledEdit] = useState<boolean>(true);
  const [isValidLength, setIsValidLength] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const specialCharRegex = /[^A-Za-z0-9]/;

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsValidLength(password.length >= 8);
    setHasNumber(/\D/.test(password));
    setHasSpecialChar(specialCharRegex.test(password));

    if (isValidLength && hasNumber && hasSpecialChar) {
      if (newPassword === confirmPassword) {
        setNotification('');
        await axios.post('http://localhost:8000/api/account', {
          newPassword
        })
          .then((res) => {
            setNotification('Successful submission.');
          })
          .catch((err) => {
            setNotification(`Submission Error. Please try again. error ${err}`);
          })
      } else {
        setConfirmPassword('');
        setNotification('Your passwords do not match.')
      }
    } else {
      setNotification('Your password does not meet the requirements.')
    }
  }

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <div className={styles.profileContainer}>
        <label className={styles.profileNotifTitles}> {notification} </label>
      </div>
      <div>
        <label className={styles.profileFieldTitles}> current password </label>
        <input id={styles.profilePassword} readOnly={toggleEdit} className={styles.profileFields} type="text" value={password} onChange={(event) => { setPassword(event.target.value) }} />
      </div>
      <div>
        <label className={styles.profileFieldTitles}> new password </label>
        <input id={styles.profileNewPassword} readOnly={toggleEdit} className={styles.profileFields} type="text" value={newPassword} onChange={(event) => { setNewPassword(event.target.value) }} />
      </div>
      <div>
        <label className={styles.profileFieldTitles}> confirm password </label>
        <input id={styles.profileConfirmPassword} readOnly={toggleEdit} className={styles.profileFields} type="text" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }} />
      </div>
      <div className="buttonContainer">
        {!showCancel
          ? (
            <button id={styles.edit} onClick={handleEditProfile} className={styles.editButton} type="submit"> edit password </button>
            )
          : (
            <div>
              <button id={styles.cancel} onClick={handleCancel} className={styles.cancelButton} type="submit"> cancel </button>
              <button id={styles.cancel} onClick={handleSaveChanges} className={styles.saveButton} type="submit"> save changes </button>
            </div>
            )}
      </div>
    </form>
  )
}
