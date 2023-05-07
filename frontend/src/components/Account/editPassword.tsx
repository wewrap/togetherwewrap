import * as React from 'react';
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const EditPassword = (): JSX.Element => {
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [editPassword, setEditProfile] = useState<string>('edit profile');
    const [cancel, setCancel] = useState<string>('');

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault; 
    }

    return (
        <form className = "profileForm" onSubmit = {handleSubmit}> 
            <label htmlFor = "profileFieldTitles"> 
                <input id = "profilePassword" className = "profileFields" type = "text" required value = {password} onChange = {(event) => { setPassword(event.target.value) }}/>
            </label>
            <label htmlFor = "profileFieldTitles"> 
                <input id = "profileNewPassword" className = "profileFields" type = "text" required value = {newPassword} onChange = {(event) => { setNewPassword(event.target.value) }}/>
            </label>
            <label htmlFor = "profileFieldTitles"> 
                <input id = "profileConfirmPassword" className = "profileFields" type = "text" required value = {confirmPassword} onChange = {(event) => { setConfirmPassword(event.target.value) }}/>
            </label>
             <div>
                <button className = "profileButton" type = "submit"> {editPassword} </button>
                <button className = "profileButton" type = "submit"> {cancel} </button>
             </div>
        </form>
    )
}