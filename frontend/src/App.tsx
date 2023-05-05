import { Routes, Route } from 'react-router-dom'
import './index.css'
import { Contacts } from './components/contacts'
import { ProtectedRoutes } from './components/protectedRoutes'
import { GetUserContext } from './hooks/UserContext'
import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import React from 'react'
import { TempLandingPage } from './components/tempLandingPage'
import { PlanForm } from './components/PlanForm'
import { Plan } from './components/Plan/Plan'
import { Hub } from './components/Hub/Hub'
import { GetFriendsContext } from './hooks/FriendsAndUserContext'
import './App.css'

function App(): JSX.Element {
  return (
    <div>
      <div id="modal"></div>
      <GetUserContext>
        <GetFriendsContext>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/contactPage" element={<Contacts />} />
              <Route path="/planForm" element={<PlanForm />} />
              <Route path="/hub" element={<Hub />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tempLandingPage" element={<TempLandingPage />} />
            <Route path="/contactPage" element={<Contacts />} />
            <Route path="/planForm" element={<PlanForm />} />
            <Route path="/plan/:id" element={<Plan />} />
          </Routes>
        </GetFriendsContext>
      </GetUserContext>
    </div >
  )
}

export default App
