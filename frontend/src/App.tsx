import { LoginForm } from './components/loginForm'
import React from 'react'
import { SignUp } from './components/signup'
import { TempLandingPage } from './components/tempLandingPage'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { PlanForm } from './components/PlanForm'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App () {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />}> </Route>
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignUp />}>  </Route>
      </Routes>
      <Routes>
        <Route path="/tempLandingPage" element={<TempLandingPage />}> </Route>
      </Routes>
      <Routes>
        <Route path="/planForm" element={<PlanForm />}> </Route>
      </Routes>

    </div>
  )
}

export default App
