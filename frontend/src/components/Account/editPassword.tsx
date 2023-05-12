import * as React from 'react';
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './editPassword.module.css';

export const EditPassword = (): JSX.Element => {
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [editPassword, setEditProfile] = useState<boolean>(true);
    const [cancel, setCancel] = useState<boolean>(false);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault; 
    }

    return (
        <form className = {styles.profileForm} onSubmit = {handleSubmit}> 
            <label htmlFor = {styles.profileFieldTitles}> current password
                <input id = {styles.profilePassword} className = {styles.profileFields} type = "text" required value = {password} onChange = {(event) => { setPassword(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> new password
                <input id = {styles.profileNewPassword} className = {styles.profileFields} type = "text" required value = {newPassword} onChange = {(event) => { setNewPassword(event.target.value) }}/>
            </label>
            <label htmlFor = {styles.profileFieldTitles}> confirm password
                <input id = {styles.profileConfirmPassword} className = {styles.profileFields} type = "text" required value = {confirmPassword} onChange = {(event) => { setConfirmPassword(event.target.value) }}/>
            </label>
            <div className = "buttonContainer">
                <button id = {styles.cancel} className = {styles.cancelButton} type = "submit"> {cancel} cancel </button>
                <button id = {styles.edit} className = {styles.editButton} type = "submit"> {editPassword} edit profile </button>
             </div>
        </form>
    )
}