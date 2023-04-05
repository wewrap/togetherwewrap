import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { TempLandingPage } from './components/tempLandingPage'
import { Contacts } from './components/contacts'
import { PlanForm } from './components/PlanForm'
import { Plan } from './components/Plan'
import './App.css'

function App (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tempLandingPage" element={<TempLandingPage />} />
        <Route path="/contactPage" element={<Contacts />} />
        <Route path="/planForm" element={<PlanForm />} />
        <Route path="/planPage" element={<Plan />} />
      </Routes>
    </div>
  )
}

export default App
