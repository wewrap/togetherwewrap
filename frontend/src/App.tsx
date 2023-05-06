import { Routes, Route } from 'react-router-dom'
import './index.css'
import { ProtectedRoutes } from './components/protectedRoutes'
import { GetUserContext } from './components/UserContext'
import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import React from 'react'
import { ContactsList } from './components/contactsList'
import { PlanForm } from './components/PlanForm'
import { TempLandingPage } from './components/tempLandingPage'
import './App.css'
import { PlanHome } from './components/PlanHome/PlanHome'

function App(): JSX.Element {
  return (
    <div>
      <GetUserContext>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/contacts" element={<ContactsList />} />
            <Route path="/planForm" element={<PlanForm />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tempLandingPage" element={<TempLandingPage />} />
          <Route path="/contacts" element={<ContactsList />} />
          <Route path="/planForm" element={<PlanForm />} />
          <Route path="/plan/:id" element={<PlanHome />} />
        </Routes>
      </GetUserContext>
    </div >
  )
}

export default App
