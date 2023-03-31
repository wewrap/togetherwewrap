import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import { TempLandingPage } from './components/tempLandingPage'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { Contacts } from './components/contacts'
import { UserContext } from './components/UserContext'
import { useState } from 'react'
import { ProtectedRoutes } from './components/protectedRoutes'

function App (): JSX.Element {
  const userState = useState(null)
  console.log('🚀 ~ file: App.tsx:13 ~ App ~ userState:', userState[0])
  return (
    <div>
        <UserContext.Provider value={userState}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/contactPage" element={<Contacts />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tempLandingPage" element={<TempLandingPage />} />
            <Route path="/contactPage" element={<Contacts />} />
          </Routes>
        </UserContext.Provider>
    </div >
  )
}

export default App
