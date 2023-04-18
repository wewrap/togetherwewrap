import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import { TempLandingPage } from './components/tempLandingPage'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { Contacts } from './components/contacts'
import { PlanForm } from './components/PlanForm'
import React from 'react'

function App (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tempLandingPage" element={<TempLandingPage />} />
        <Route path="/contactPage" element={<Contacts />} />
        <Route path="/planForm" element={<PlanForm />} />
      </Routes>
    </div>
  )
}

export default App
