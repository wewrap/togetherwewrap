import axios from "axios";
import { useState } from "react";
import {LoginForm} from './Components/loginForm'
const serverURL = 'http://localhost:8000'

function App() {
  const [message, setMessage] = useState<string>("");

  const resetMessage = () => {
    setMessage("")
  }

  const handleClick = async () => {
    const isDisplayingMessage = !!message
    if (isDisplayingMessage) {
      resetMessage()
      return
    };

    try {
      const res = await axios.get(`${serverURL}/api`)
      const serverMessage = res.data.data
      setMessage(serverMessage)
    } catch (error) {
      console.error("Error connecting to backend:", (error as any).message)
      alert(`Error connecting to backend: ${(error as any).message}`)
    }
  }
  return (
    <div className="App">
      <h2>{message ?? ""}</h2>
      <LoginForm />
    </div>
  );
}

export default App;
