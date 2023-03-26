import React, { useState } from 'react'
import { CreateAContactForm } from './contactsForm'

export const ContactsList = () => {
    const [showCreateAContactForm, setShowCreateAContactForm] = useState<boolean>(false)

    const toggleContactForm = () => {
        setShowCreateAContactForm(!showCreateAContactForm)
    }

    return (
        <div>
          <h1>Contacts List</h1>
          <button onClick={toggleContactForm}>Add Contact</button>
          {showCreateAContactForm && <CreateAContactForm />}
          {/* rest of the contacts list page */}
        </div>
    )
}
