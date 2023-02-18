import {LoginForm} from './components/loginForm';
import {SignUp} from '../src/components/signup';
import './index.css';
import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const serverURL = 'http://localhost:8000';
function App() {
  return (
<div> 
    <Routes> 
      <Route path = "/signup" element={<SignUp/>}>  </Route>
    </Routes>
    <Routes> 
      <Route path = "/login" element = {<LoginForm/>}> </Route>
    </Routes>
</div>
  );
}

export default App;
