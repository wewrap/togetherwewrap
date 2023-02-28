import React, {useState} from 'react';
import axios from 'axios';

type ImportantDate = {
    date: Date;
    type: string;
}
enum RelationshipType {
    COWORKER = 'coworker',
    SIGNIFICANT_OTHER = 'significant_other',
    FRIEND = 'friend',
    FAMILY = 'family',
    ACQUAINTANCE = 'acquaintance',
    CLASSMATE = 'classmate',
    OTHER = 'other',
    UNKNOWN = 'unknown',
}
export const Contacts = () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [relationship, setRelationship] = useState<RelationshipType>(RelationshipType.UNKNOWN)
    const [importantDate, setImportantDate] = useState<Array<ImportantDate>>([])
    const [email, setEmail] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    // TODO T:110 (FK) Support adding addresses 
    // const [address, setAddress] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/user/contacts", {
                firstName,
                lastName,
                relationship,
                importantDate,
                email,
                phoneNumber,
                notes,
            })
        } catch(error) {
            console.error(error);
            setErrorMessage((error as any).response.date ?? "Unknown error occured.");
        }
    };

    const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };
        const handleNameChange = handleChange(setFullName);
        const handleRelationshipChange = handleChange(setRelationship);
        const handleImportantDateChange = handleChange(setImportantDate)
        const handleEmailChange = handleChange(setEmail);
        const handlePhoneNumberChange = handleChange(setPhoneNumber);
        const handleAddressChange = handleChange(setAddress);
        const handleNotesChange = handleChange(setNotes);

    return (
        <div className='contacts_form'>
            <h1>Add a contact</h1>
            <form action='/user/contacts' method='post' onSubmit={handleSubmit}>
                {errorMessage && <p className='error_message'>{errorMessage}</p>}
                <div className='user_input'>
                    <label htmlFor='full_name'>Full name</label>
                    <input className='full_name' name='full_name' type="text" autoComplete='on' required value={fullName} onChange={handleNameChange}></input>

                    <label htmlFor='relationship'>Relationship status</label>
                    <input className='relationship' name='relationship' type='text' autoComplete='on' required value={relationship} onChange={handleRelationshipChange}></input>

                    <label htmlFor='important_date'>Enter date e.g. birthday, anniversary, holiday etc.</label>
                    <input className='important_date' name='important_date' type='text' autoComplete='on' required value={importantDate} onChange={handleImportantDateChange}></input>
                 
                    <label htmlFor='email'>Email</label>
                    <input className='email' name='email' type='text' autoComplete='on' required value={email} onChange={handleEmailChange}></input>

                    <label htmlFor='phone_number'>Phone number</label>
                    <input className='phone_number' name='phone_number' type='text' autoComplete='on' required value={phoneNumber} onChange={handlePhoneNumberChange}></input>

                    <label htmlFor='address'>Address</label>
                    <input className='address' name='address' type='text' autoComplete='on' required value={address} onChange={handleAddressChange}></input>

                    <label htmlFor='notes'>Extra Notes</label>
                    <input className='notes' name='notes' type='text' autoComplete='on' required value={notes} onChange={handleNotesChange}></input>
                </div>
                <div>
                    <button className='add_contact_button' type='submit'>Add contact</button>
                </div>
            </form>
        </div>
    );
};
