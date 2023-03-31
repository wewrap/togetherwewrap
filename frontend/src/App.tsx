import { LoginForm } from './components/loginForm';
import { SignUp } from './components/signup';
import { TempLandingPage } from './components/tempLandingPage';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Contacts } from './components/contacts';
import Calendar from './components/calendar_frontend/calendar';
function App() {
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
        <Route path="/contactPage" element={<Contacts />}> </Route>
      </Routes>
      <Routes>
        <Route path="/calendar" element={<Calendar />}></Route>
      </Routes>
    </div>
  );
}

export default App;
