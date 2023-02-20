import {LoginForm} from './components/loginForm';
import {SignUp} from './components/signup';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const serverURL = 'http://localhost:8000';
function App() {
  return (
<div> 
    <Routes> 
      <Route path = "/login" element = {<LoginForm/>}> </Route>
    </Routes>
    <Routes> 
      <Route path = "/signup" element={<SignUp/>}>  </Route>
    </Routes>
</div>
  );
}

export default App;
