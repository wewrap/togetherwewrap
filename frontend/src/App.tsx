import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ContactsList } from './components/contactsList'
import { PlanForm } from './components/PlanForm'
import { Plan } from './components/Plan/Plan'
import { TempLandingPage } from './components/tempLandingPage'
import './App.css'

function App (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tempLandingPage" element={<TempLandingPage />} />
        <Route path="/contactPage" element={<ContactsList />} />
        <Route path="/planForm" element={<PlanForm />} />
        <Route path="/plan/:id" element={<Plan />} />
      </Routes>
    </div>
  )
}

export default App
