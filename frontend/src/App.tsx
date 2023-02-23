import {LoginForm} from './components/loginForm';
import {SignUp} from './components/signup';
import { TempLandingPage } from './components/tempLandingPage';
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
    <Routes>
      <Route path = "/tempLandingPage" element={<TempLandingPage/>}> </Route>
    </Routes>
</div>
  );
}

export default App;
