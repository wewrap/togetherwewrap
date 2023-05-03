import { Routes, Route } from 'react-router-dom'
import './index.css'
import { Contacts } from './components/contacts'
import { ProtectedRoutes } from './components/protectedRoutes'
import { GetUserContext } from './components/UserContext'
import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import React from 'react'
import { TempLandingPage } from './components/tempLandingPage'
import { PlanForm } from './components/PlanForm'
import './App.css'
import { PlanHome } from './components/PlanHome/PlanHome'

function App(): JSX.Element {
  return (
    <div>
      <GetUserContext>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/contactPage" element={<Contacts />} />
            <Route path="/planForm" element={<PlanForm />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tempLandingPage" element={<TempLandingPage />} />
          <Route path="/contactPage" element={<Contacts />} />
          <Route path="/planForm" element={<PlanForm />} />
          <Route path="/plan/:id" element={<PlanHome />} />
        </Routes>
      </GetUserContext>
    </div >
  )
}

export default App
