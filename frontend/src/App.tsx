import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {SignUp} from '../src/components/signup';
const serverURL = 'http://localhost:8000';

function App() {
  return (
<div> 
<Routes> 
      <Route path = "/signup" element={<SignUp/>}>  </Route>
    </Routes>
</div>
  );
}

export default App;

{/* <div className="App">
<h2>{message ?? ""}</h2>
<button onClick={handleClick}>click me!</button>
</div> */}