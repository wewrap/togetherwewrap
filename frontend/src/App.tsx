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
import { PlanInviteVerification } from './components/PlanInviteVerification'
import { PlanInviteLogInRequest } from './components/PlanInviteLogInRequest'
import { Account } from './components/Account/accountForm'
import { Hub } from './components/Hub/Hub'

function App(): JSX.Element {
  return (
    <div>
      <div id="modal"></div>
      <GetUserContext>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/account" element={<Account />} />
            <Route path="/contacts" element={<ContactsList />} />
            <Route path="/plan-form" element={<PlanForm />} />
            <Route path="/plan/:id" element={<PlanHome />} />
            <Route path="/hub" element={<Hub />} />
            {/* <Route path="/calendar" element={<h1>Calendar</h1>} /> */}
            <Route path="/profile" element={<h1>profile</h1>} />
            <Route path="/example" element={<h1>example</h1>} />
          </Route>
          <Route element={<Home />}>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/support" element={<p>Contact help@wewrap.com for support</p>} /> */}
            {/* <Route path="/about" element={<h1>About WeWrap</h1>} /> */}
            <Route path="/learn-more" element={<h1>Learn more about WeWrap</h1>} />
            <Route path="/plan-invite-login-request" element={<PlanInviteLogInRequest />} />
          </Route>
          <Route path="/plan-invite/:id" element={<PlanInviteVerification />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </GetUserContext>
      <Routes>
      </Routes>

    </div >
  )
}

export default App
