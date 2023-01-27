import axios from "axios";
import { useState } from "react";
const serverURL = 'http://localhost:8000'

function App() {
  const [message, setMessage] = useState("");
  
  const handleClick = async () => {
    if (message) {
      setMessage("")
      return
    }
    const res = await axios.get(`${serverURL}/api`)
    const serverMessage = res.data.data
    setMessage(serverMessage)
  }
  return (
    <div className="App">
      <h2>{message ? message : ""}</h2>
      <button onClick={handleClick}>button</button>
    </div>
  );
}

export default App;
