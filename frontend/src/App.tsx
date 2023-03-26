import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import { TempLandingPage } from './components/tempLandingPage'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { Contacts } from './components/contacts'
import { UserContext } from './components/UserContext'
import { useState } from 'react'

function App (): JSX.Element {
  const userState = useState(null)
  return (
    <div>
      <Routes>
        <UserContext.Provider value={userState}>
          <Route path="/login" element={<LoginForm />}> </Route>
          <Route path="/signup" element={<SignUp />}>  </Route>
          <Route path="/tempLandingPage" element={<TempLandingPage />}> </Route>
          <Route path="/contactPage" element={<Contacts />}> </Route>
        </UserContext.Provider>
      </Routes>
    </div>
  )
}

export default App
