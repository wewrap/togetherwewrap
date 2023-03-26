import { LoginForm } from './components/loginForm'
import { SignUp } from './components/signup'
import { TempLandingPage } from './components/tempLandingPage'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { ContactsList } from './components/contactsList'
function App () {
  return (
    <div>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tempLandingPage" element={<TempLandingPage />} />
      <Route path="/contactPage" element={<ContactsList />} />
    </Routes>
  </div>
  )
}

export default App
