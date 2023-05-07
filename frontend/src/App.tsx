import { Routes, Route } from 'react-router-dom'
import './index.css'
import { ProtectedRoutes } from './components/protectedRoutes'
import { GetUserContext } from './components/UserContext'
import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import React from 'react'
import { LandingPage } from './components/LandingPage/LandingPage'
import { ContactsList } from './components/contactsList'
import { PlanForm } from './components/PlanForm'
import './App.css'
import { PlanHome } from './components/PlanHome/PlanHome'
import { Home } from './components/Home/Home'

function App(): JSX.Element {
  return (
    <div>
      <GetUserContext>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/contacts" element={<ContactsList />} />
            <Route path="/planForm" element={<PlanForm />} />
            <Route path="/plan/:id" element={<PlanHome />} />
            <Route path="/hub" element={<h1>hub</h1>} />
            <Route path="/support" element={<h1>Support</h1>} />
            <Route path="/calendar" element={<h1>Calendar</h1>} />
            <Route path="/contacts" element={<h1>Contacts</h1>} />
            <Route path="/profile" element={<h1>profile</h1>} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Home />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<p>About WeWrap</p>} />
            <Route path="/support" element={<p>Contact help@wewrap.com for support</p>} />
          </Route>
        </Routes>
      </GetUserContext>

    </div >
  )
}

export default App
