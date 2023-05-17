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
import { PlanInviteVerification } from './PlanInviteVerification'

function App(): JSX.Element {
  return (
    <div>
      <GetUserContext>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/contacts" element={<ContactsList />} />
            <Route path="/plan-form" element={<PlanForm />} />
            <Route path="/plan/:id" element={<PlanHome />} />
            <Route path="/hub" element={<h1>hub</h1>} />
            <Route path="/calendar" element={<h1>Calendar</h1>} />
            <Route path="/profile" element={<h1>profile</h1>} />
            <Route path="/example" element={<h1>example</h1>} />
          </Route>
          <Route element={<Home />}>
            <Route path="/support" element={<p>Contact help@wewrap.com for support</p>} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<h1>About WeWrap</h1>} />
            <Route path="/learn-more" element={<h1>Learn more about WeWrap</h1>} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/plan-invite/:id" element={<PlanInviteVerification />} />
          <Route path="/login/:id" element={<LoginForm />} />
          <Route path="/signup/:id" element={<SignUp />} />
        </Routes>
      </GetUserContext>

    </div >
  )
}

export default App
