import React, {useState} from 'react';
import axios from 'axios';

export const Contacts = () => {
    const [fullName, setFullName] = useState<string>('')
    const [relationship, setRelationship] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/user/contacts", {
                fullName,
                relationship,
                email,
                phoneNumber,
                address,
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
    const handleEmailChange = handleChange(setEmail);
    const handlePhoneNumberChange = handleChange(setPhoneNumber);
    const handleAddressChange = handleChange(setAddress);
    const handleNotesChange = handleChange(setNotes);

    return (
        <div className='contacts_form'>
            <h1>Add a contact</h1>
            <form action='/user/contacts' method='post' onSubmit={handleSubmit}>
                {errorMessage && <p className='error_message'>{errorMessage}</p>}
            </form>
        </div>
    );
};
