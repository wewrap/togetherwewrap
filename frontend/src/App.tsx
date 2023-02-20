import {LoginForm} from './Components/loginForm';
import {SignUp} from './Components/signup';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
