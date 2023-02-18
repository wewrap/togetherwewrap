import axios from 'axios'
import { useState } from 'react'
const serverURL = 'http://localhost:8000'

function App () {
  const [message, setMessage] = useState<string>('')

  const resetMessage = () => {
    setMessage('')
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
      // error has type 'unknown'. My fix: assert error as any.
      console.error('Error connecting to backend:', (error as any).message)
      alert(`Error connecting to backend: ${(error as any).message}`)
    }
  }
  return (
    <div className="App">
      <h2>{message ?? ''}</h2>
      <button onClick={handleClick}>click me!</button>
    </div>
  )
}

export default App
